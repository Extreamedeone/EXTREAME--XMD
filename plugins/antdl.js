import config from '../config.mjs';

const deletedMessages = new Map();

async function antiDelete(sock, chatId, message) {
    try {
        const sender = message.key.remoteJid;
        const isDeleted = message.message?.protocolMessage?.type === 0;

        if (!isDeleted) return;

        // Store deleted message details for recovery
        deletedMessages.set(sender, message.message);

        await sock.sendMessage(chatId, {
            text: `⚠️ *Anti-Delete Alert!* A message was deleted by @${sender.split('@')[0]}! Restoring...`,
            mentions: [sender]
});

        // Restore deleted message
        await sock.sendMessage(chatId, {
            forward: deletedMessages.get(sender),
            contextInfo: { mentionedJid: [sender]}
});

        console.log(`🚫 Anti-Delete activated! Message restored for: ${sender}`);

} catch (error) {
        console.error('Error in antiDelete command:', error);
        await sock.sendMessage(chatId, { text: '⚠️ Anti-delete protection encountered an issue!'});
}
}
export default {
  name: 'antiDelete',         // Unique name of the command
  description: 'recover deleted messages',   // Optional, for help menus
  execute: async (...args) => {
    // Your logic here
    console.log('antdl executed!');
  }
};
