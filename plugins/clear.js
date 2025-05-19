async function clear(sock, chatId) {
    try {
        const message = await sock.sendMessage(chatId, { text: 'Clearing bot messages...' });
        const messageKey = message.key; // Get the key of the message the bot just sent
        
        // Now delete the bot's message
        await sock.sendMessage(chatId, { delete: messageKey });
        
    } catch (error) {
        console.error('Error clearing messages:', error);
        await sock.sendMessage(chatId, { text: 'An error occurred while clearing messages.' });
    }
}

export default {
  name: 'clear',         // Unique name of the command
  description: 'clears msg',   // Optional, for help menus
  execute: async (...args) => {
    // Your logic here
    console.log('Clear executed!');
  }
};
