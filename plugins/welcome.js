import config from '../config.mjs';

async function welcome(sock, chatId, participant) {
    try {
        const username = participant.split('@')[0];
        const message = `🌟 *Welcome to the Ultimate Hub — EXTREAME-XMD!* 🚀\n\n` +
                       `🔥 Hey @${username}, you're now part of something legendary!\n\n` +
                       `✨ *Features you'll love:*\n` +
                       `⚡ AI-Powered Smart Assistance\n` +
                       `🔰 Advanced Security & Moderation\n` +
                       `🎉 Fun, Games & Interactive Commands\n` +
                       `💬 24/7 Responsive Community\n\n` +
                       `🚀 Type *.menu* to explore all commands & **unleash** the power of EXTREAME-XMD!`;

        await sock.sendMessage(chatId, {
            text: message,
            mentions: [participant],
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true
}
});

        console.log(`🎉 Welcome message sent to: ${username}`);

} catch (error) {
        console.error('Error in welcome command:', error);
}
}

export default {
  name: 'welcome',         // Unique name of the command
  description: 'welcoming message',   // Optional, for help menus
  execute: async (...args) => {
    // Your logic here
    console.log('welcome executed!');
  }
};
