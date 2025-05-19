import config from '../config.mjs';

const warnings = new Map();
const badWords = ["kino", "fuck", "fala"]; // Add offensive words here

async function antiBadWords(sock, chatId, message) {
    try {
        const sender = message.key.remoteJid;
        const text = message.message?.conversation || message.message?.extendedTextMessage?.text;

        if (!text) return;

        if (badWords.some(word => text.toLowerCase().includes(word))) {
            if (!warnings.has(sender)) {
                warnings.set(sender, 1);
} else {
                warnings.set(sender, warnings.get(sender) + 1);
}

            const warningCount = warnings.get(sender);

            // Delete the offensive message immediately
            await sock.sendMessage(chatId, { delete: message.key});

            if (warningCount>= 3) {
                await sock.sendMessage(chatId, { text: `🚫 *You have been warned 3 times for using offensive language. You will be removed from the group!*`});

                // Kick user from group
                await sock.groupParticipantsUpdate(chatId, [sender], "remove");
                warnings.delete(sender);
} else {
                await sock.sendMessage(chatId, { text: `⚠️ *Warning ${warningCount}/3: Please refrain from using offensive language!* Your message has been deleted.`});

                console.log(`⚠️ Warning issued (${warningCount}/3) and message deleted for: ${sender}`);
}
}
} catch (error) {
        console.error('Error in antiBadWords command:', error);
        await sock.sendMessage(chatId, { text: '⚠️ Anti-badwords protection encountered an issue!'});
}
}
export default {
  name: 'antbd2',         // Unique name of the command
  description: 'matusifc',   // Optional, for help menus
  execute: async (...args) => {
    // Your logic here
    console.log('antibadwords executed!');
  }
};
