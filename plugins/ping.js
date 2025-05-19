import os from 'os';
import settings from '../settings.js';

function formatTime(seconds) {
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds %= (24 * 60 * 60);
    const hours = Math.floor(seconds / (60 * 60));
    seconds %= (60 * 60);
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);

    let time = '';
    if (days > 0) time += `${days}d `;
    if (hours > 0) time += `${hours}h `;
    if (minutes > 0) time += `${minutes}m `;
    if (seconds > 0 || time === '') time += `${seconds}s`;

    return time.trim();
}

async function ping(sock, chatId, message) {
    try {
        const start = Date.now();
        await sock.sendMessage(chatId, { text: 'Pong!' });
        const end = Date.now();
        const ping = Math.round((end - start) / 2);

        const uptimeInSeconds = process.uptime();
        const uptimeFormatted = formatTime(uptimeInSeconds);

        const botInfo = `
┏━━〔 EXTREAME-XMD 〕━━┓
┃ 🚀 Ping     : ${ping} ms
┃ ⏱️ Uptime   : ${uptimeFormatted}
┃ 🔖 Version  : v${settings.version}
┗━━━━━━━━━━━━━━━━━━━┛`.trim();

        await sock.sendMessage(chatId, { text: botInfo, quoted: message });

    } catch (error) {
        console.error('Error in ping command:', error);
        await sock.sendMessage(chatId, { text: '❌ Failed to get bot status.' });
    }
}

export default {
    name: 'ping',
    description: 'Check bot status and latency',
    execute: async (sock, msg, args) => {
        await ping(sock, msg.chat, msg);
    }
};
