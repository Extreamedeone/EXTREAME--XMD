import moment from 'moment-timezone';
import fs from 'fs';
import os from 'os';
import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import config from '../config.mjs';

// Get total memory and free memory in bytes
const totalMemoryBytes = os.totalmem();
const freeMemoryBytes = os.freemem();

// Define unit conversions
const byteToKB = 1 / 1024;
const byteToMB = byteToKB / 1024;
const byteToGB = byteToMB / 1024;

// Function to format bytes to a human-readable format
function formatBytes(bytes) {
  if (bytes >= Math.pow(1024, 3)) {
    return (bytes * byteToGB).toFixed(2) + ' GB';
  } else if (bytes >= Math.pow(1024, 2)) {
    return (bytes * byteToMB).toFixed(2) + ' MB';
  } else if (bytes >= 1024) {
    return (bytes * byteToKB).toFixed(2) + ' KB';
  } else {
    return bytes.toFixed(2) + ' bytes';
  }
}

// Bot Process Time
const uptime = process.uptime();
const day = Math.floor(uptime / (24 * 3600)); // Calculate days
const hours = Math.floor((uptime % (24 * 3600)) / 3600); // Calculate hours
const minutes = Math.floor((uptime % 3600) / 60); // Calculate minutes
const seconds = Math.floor(uptime % 60); // Calculate seconds

// Uptime
const uptimeMessage = `*I am alive now since ${day}d ${hours}h ${minutes}m ${seconds}s*`;
const runMessage = `*☀️ ${day} Day*\n*🕐 ${hours} Hour*\n*⏰ ${minutes} Minutes*\n*⏱️ ${seconds} Seconds*\n`;

const xtime = moment.tz("Asia/Colombo").format("HH:mm:ss");
const xdate = moment.tz("Asia/Colombo").format("DD/MM/YYYY");
const time2 = moment().tz("Asia/Colombo").format("HH:mm:ss");
let pushwish = "";

if (time2 < "05:00:00") {
  pushwish = `Good Morning 🌄`;
} else if (time2 < "11:00:00") {
  pushwish = `Good Morning 🌄`;
} else if (time2 < "15:00:00") {
  pushwish = `Good Afternoon 🌅`;
} else if (time2 < "18:00:00") {
  pushwish = `Good Evening 🌃`;
} else if (time2 < "19:00:00") {
  pushwish = `Good Evening 🌃`;
} else {
  pushwish = `Good Night 🌌`;
}

const test = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const mode = config.MODE === 'public' ? 'public' : 'private';
  const pref = config.PREFIX;

  const validCommands = ['groupmenu', 'group', 'menuai'];

  if (validCommands.includes(cmd)) {
    const str = `╭━━━〔 *EXTREAME-XMD* 〕━━━┈⊷
┃•╭──────────────
┃•│ Owner : *pilatodefury*
┃•│ User : *${m.pushName}*
┃•│ Mode : *${mode}*
┃•│ Platform : *${os.platform()}*
┃•│ Prefix : [${prefix}]
┃™╰──────────────
╰━━━━━━━━━━━━━━━┈⊷ 
> *ʜᴇʏ ${m.pushName} ${pushwish}*
╭━━〔 Group Menu 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• ${prefix}𝙻𝚒𝚗𝚔𝙶𝚛𝚘𝚞𝚙
┃◈┃• ${prefix}𝚂𝚎𝚝𝚙𝚙𝚐𝚌
┃◈┃• ${prefix}𝚂𝚎𝚝𝚗𝚊𝚖𝚎
┃◈┃• ${prefix}𝚂𝚎𝚝𝚍𝚎𝚜𝚌
┃◈┃• ${prefix}𝙶𝚛𝚘𝚞𝚙
┃◈┃• ${prefix}𝙶𝚌𝚜𝚎𝚝𝚝𝚒𝚗𝚐
┃◈┃• ${prefix}𝚆𝚎𝚕𝚌𝚘𝚖𝚎
┃◈┃• ${prefix}𝙰𝚍𝚍
┃◈┃• ${prefix}𝙺𝚒𝚌𝚔
┃◈┃• ${prefix}𝙷𝚒𝚍𝚎𝚃𝚊𝚐
┃◈┃• ${prefix}𝚃𝚊𝚐𝚊𝚕𝚕
┃◈┃• ${prefix}𝙰𝚗𝚝𝚒𝙻𝚒𝚗𝚔
┃◈┃• ${prefix}𝙰𝚗𝚝𝚒𝚃𝚘𝚡𝚒𝚌
┃◈┃• ${prefix}𝙿𝚛𝚘𝚖𝚘𝚝𝚎
┃◈┃• ${prefix}𝙳𝚎𝚖𝚘𝚝𝚎
┃◈┃• ${prefix}𝙶𝚎𝚝𝚋𝚒𝚘
┃◈└───────────┈⊷
╰──────────────┈⊷`;

    await Matrix.sendMessage(m.from, {
      image: fs.readFileSync('./media/extreame2.jpg'),
      caption: str,
    }, {
      quoted: m
    });

    // Send audio after sending the menu
    await Matrix.sendMessage(m.from, {
      audio: { url: 'https://github.com/JawadYTX/KHAN-DATA/raw/refs/heads/main/autovoice/menunew.m4a' },
      mimetype: 'audio/mp4',
      ptt: true
    }, { quoted: m });
  }
};

export default {
  name: 'test',         // Unique name of the command
  description: 'test bot',   // Optional, for help menus
  execute: async (...args) => {
    // Your logic here
    console.log('test executed!');
  }
};
