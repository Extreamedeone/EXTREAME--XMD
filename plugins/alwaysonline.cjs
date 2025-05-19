import { scheduleJob} from 'node-schedule';
import config from '../config.mjs';

export async function alwaysOnline(sock, chatId) {
    try {
        const message = `🚀 *EXTREAME-XMD is Online & Active!* 🔥\n\n` +
                       `*🛠 Version:* ${config.version}\n` +
                       `*✅ Status:* Running 24/7\n` +
                       `*🌎 Mode:* Public & Interactive\n\n` +
                       `*✨ Features Enabled:*\n` +
                       `🔹 Auto-Responding AI\n` +
                       `🔹 Group Moderation & Security\n` +
                       `🔹 Antilink & Spam Protection\n` +
                       `🔹 Fun & Interactive Commands\n\n` +
                       `⚡ Type *.menu* to see all commands!`;

        await sock.sendMessage(chatId, { text: message});

        // ✅ Schedule periodic status updates
        scheduleJob('*/30 * * * *', async () => {
            await sock.sendMessage(chatId, {
                text: "🚀 EXTREAME-XMD is still **online** & running smoothly!"
});
            console.log("🔄 Sent periodic online status update.");
});

} catch (error) {
        console.error('Error in alwaysOnline command:', error);
        await sock.sendMessage(chatId, { text: '🚀 EXTREAME-XMD is active and running!'});
}
}
export default alwaysonline;
