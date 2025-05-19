import config from '../config.mjs';

const warnings = new Map();

async function antilink(sock, chatId, message) {
    try {
        const sender = message.key.remoteJid;
        const text = message.message?.conversation || message.message?.extendedTextMessage?.text;

        if (!text) return;

        const forbiddenLinks = ["drive.google.com", "mega.nz", "anonfiles.com", "mediafire.com"];

        if (forbiddenLinks.some(link => text.includes(link))) {
            if (!warnings.has(sender)) {
                warnings.set(sender, 1);
} else {
                warnings.set(sender, warnings.get(sender) + 1);
}

            const warningCount = warnings.get(sender);

            if (warningCount>= 3) {
                await sock.sendMessage(chatId, { text: `🚫 *You have been warned 3 times for sharing restricted download links. Your message will be deleted now!*`});

                // Delete message after third warning
                await sock.sendMessage(chatId, { delete: message.key});

                // Reset warning count after deletion
                warnings.delete(sender);
} else {
                await sock.sendMessage(chatId, { text: `⚠️ *Warning ${warningCount}/3: Download links are not allowed!* Your message will be deleted.`});

                // Delete the message immediately after detection
                await sock.sendMessage(chatId, { delete: message.key});

                console.log(`⚠️ Warning issued (${warningCount}/3) and message deleted for: ${sender}`);
}
}
} catch (error) {
        console.error('Error in antiDownload command:', error);
        await sock.sendMessage(chatId, { text: '⚠️ Anti-download protection encountered an issue!'});
}
}
export default {
  name: 'antilink',         // Unique name of the command
  description: 'No links allowed',   // Optional, for help menus
  execute: async (...args) => {
    // Your logic here
    console.log('antilink executed!');
  }
};
