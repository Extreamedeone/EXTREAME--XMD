import dotenv from 'dotenv';
dotenv.config();

import {
    makeWASocket,
    Browsers,
    fetchLatestBaileysVersion,
    DisconnectReason,
    useMultiFileAuthState,
    getContentType,
    makeInMemoryStore,
    makeCacheableSignalKeyStore,
    jidNormalizedUser
} from '@whiskeysockets/baileys';

import { PHONENUMBER_MCC } from './lib/PairingPatch.cjs';
import { Handler, Callupdate, GroupUpdate } from './data/index.js';
import pino from 'pino';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import moment from 'moment-timezone';
import axios from 'axios';
import config from './config.mjs';
import pkg from './lib/autoreact.cjs';
import readline from 'readline';
import NodeCache from 'node-cache';

const { emojis, doReact } = pkg;
const prefix = '.';
const sessionDir = path.resolve('session');
const credsPath = path.join(sessionDir, 'creds.json');
const deploymentLogFile = 'deployment_log.json';

if (!fs.existsSync(sessionDir)) {
    fs.mkdirSync(sessionDir, { recursive: true });
}
if (!fs.existsSync(credsPath)) {
    fs.writeFileSync(credsPath, '{}');
}

let dailyDeployments = 0;
let totalDeployments = 0;

try {
    if (fs.existsSync(deploymentLogFile)) {
        const data = JSON.parse(fs.readFileSync(deploymentLogFile, 'utf-8'));
        const today = moment().tz(config.TIME_ZONE || 'Africa/Nairobi').format('YYYY-MM-DD');
        dailyDeployments = data.date === today ? data.dailyCount : 0;
        totalDeployments = data.totalCount || 0;
    }
} catch (e) {
    console.error('Error reading deployment log:', e);
}

const logger = pino({ timestamp: () => `,"time":"${new Date().toJSON()}"` });
const msgRetryCounterCache = new NodeCache();
const store = makeInMemoryStore({ logger: pino().child({ level: 'fatal', stream: 'store' }) });

let phoneNumber = "254700000000";
let owner = JSON.parse(fs.readFileSync('./database/owner.json'));

const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code");
const useMobile = process.argv.includes("--mobile");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (text) => new Promise((resolve) => rl.question(text, resolve));

async function sendDeploymentNotification(Matrix) {
    try {
        if (!config.OWNER_NUMBER || !Matrix.user?.id) return;

        const now = moment().tz(config.TIME_ZONE || 'Africa/Nairobi');
        const today = now.format('YYYY-MM-DD');
        dailyDeployments++;
        totalDeployments++;

        fs.writeFileSync(deploymentLogFile, JSON.stringify({
            date: today,
            dailyCount: dailyDeployments,
            totalCount: totalDeployments
        }));

        const deployTime = now.format('h:mm:ss A');
        const deployDate = now.format('Do MMMM YYYY');
        const notificationMessage = `*🔔 Bot Deployment Notice*

*Bot:* ${config.BOT_NAME || "EXTREAME-XMD"}
*Date:* ${deployDate}
*Time:* ${deployTime}
*Prefix:* \`${prefix}\`
*Mode:* ${config.MODE || "public"}
*User:* ${Matrix.user.id.split('@')[0]}

*Deployments Today:* ${dailyDeployments}
*Total Deployments:* ${totalDeployments}`;

        await Matrix.sendMessage(`${config.OWNER_NUMBER}@s.whatsapp.net`, {
            text: notificationMessage,
            contextInfo: { forwardingScore: 999, isForwarded: true }
        });

        console.log(chalk.green('✓ Deployment notification sent.'));
    } catch (error) {
        console.error(chalk.red('✗ Deployment notification failed:'), error);
    }
}

async function start() {
    try {
        const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
        const { version } = await fetchLatestBaileysVersion();

        const Matrix = makeWASocket({
            version,
            logger: pino({ level: 'silent' }),
            browser: Browsers.windows('Firefox'),
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" }))
            },
            getMessage: async (key) => {
                let jid = jidNormalizedUser(key.remoteJid);
                let msg = await store.loadMessage(jid, key.id);
                return msg?.message || "";
            },
            msgRetryCounterCache,
            markOnlineOnConnect: true,
            generateHighQualityLinkPreview: true,
        });

        store.bind(Matrix.ev);

        Matrix.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect, pairingCode } = update;

            if (
                connection === 'close' &&
                (!lastDisconnect?.error || lastDisconnect.error.output?.statusCode !== DisconnectReason.loggedOut)
            ) {
                console.log("Reconnecting...");
                setTimeout(() => start(), 5000);
            }

            if (pairingCode) {
                console.log(chalk.cyanBright(`Pairing Code: ${chalk.yellowBright(pairingCode)} (expires soon)`));
            }

            if (connection === 'open') {
                console.log(chalk.green("✓ Connected Successfully"));

                setTimeout(async () => {
                    if (Matrix.user?.id) {
                        const currentDate = moment().tz("Africa/Nairobi").format("YYYY-MM-DD HH:mm:ss");
                        try {
                            await Matrix.sendMessage(Matrix.user.id, {
                                image: { url: "media/extreame2.jpg" },
                                caption: `*Hello EXTREAME-XMD!*\nCurrent Date: ${currentDate}`,
                                contextInfo: { forwardingScore: 999, isForwarded: true }
                            });
                        } catch (e) {
                            console.warn("❗ Failed to send welcome message:", e.message);
                        }

                        await sendDeploymentNotification(Matrix);
                    } else {
                        console.warn("Matrix.user.id is still undefined, skipping welcome message.");
                    }
                }, 2000);
            }
        });

        Matrix.ev.on('creds.update', saveCreds);
        Matrix.ev.on('call', async (json) => await Callupdate(json, Matrix));
        Matrix.ev.on('group-participants.update', async (msg) => await GroupUpdate(Matrix, msg));

        Matrix.ev.on("messages.upsert", async (chatUpdate) => {
            const mek = chatUpdate.messages?.[0];
            if (!mek || !mek.message) return;

            await Handler(chatUpdate, Matrix, logger);

            const contentType = getContentType(mek.message);
            mek.message = contentType === 'ephemeralMessage'
                ? mek.message.ephemeralMessage.message
                : mek.message;

            if (!mek.key.fromMe && config.AUTO_REACT) {
                const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                await doReact(randomEmoji, mek, Matrix);
            }

            if (mek.key.remoteJid === 'status@broadcast' && config.AUTO_STATUS_REACT === "true") {
                const emojiList = ['❤️', '💸', '😇', '🍂', '💥', '💯', '🔥', '💫'];
                const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];
                await Matrix.readMessages([mek.key]);
                await Matrix.sendMessage(mek.key.remoteJid, {
                    react: { text: randomEmoji, key: mek.key }
                });
            }
        });

        Matrix.public = config.MODE === "public";
    } catch (error) {
        console.error('‼️ Fatal Error:', error);
        process.exit(1);
    }
}

async function init() {
    if (fs.existsSync(credsPath)) {
        console.log("🔐 Session found, connecting...");
        await start();
    } else {
        console.log("🔑 No session found. Generating Pair Code...");
        await start();
    }
}

init();
