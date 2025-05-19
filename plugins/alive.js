import settings from "../settings.js";

async function alive(sock, chatId) {
    try {
        const message = `🚀 *EXTREAME-XMD is Online & Unstoppable!* 🔥\n\n` +
                       `*🛠 Version:* ${settings.version}\n` +
                       `*✅ Status:* Fully Operational\n` +
                       `*🌎 Mode:* Public & Ready\n\n` +
                       `*✨ Advanced Features:*\n` +
                       `🔥 AI-Powered Responses\n` +
                       `🔰 Smart Auto-Moderation\n` +
                       `🔗 Antilink & Security Filters\n` +
                       `🎭 Fun & Interactive Commands\n` +
                       `💬 Real-Time Chat Enhancements\n` +
                       `💥 And much more!\n\n` +
                       `⚡ Type *.menu* to unlock all commands!`;

        await sock.sendMessage(chatId, {
            text: message,
});
} catch (error) {
        console.error('Error in alive command:', error);
        await sock.sendMessage(chatId, { text: '🚀 EXTREAME-XMD is alive and running at full speed!'});
}
}
export default {
  name: 'alive',         // Unique name of the command
  description: 'check if the bot is active',   // Optional, for help menus
  execute: async (...args) => {
    // Your logic here
    console.log('Bot is active!');
  }
};
