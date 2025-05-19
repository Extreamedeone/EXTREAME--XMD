import isAdmin from '../lib/isAdmin.js';

async function dlt(sock, chatId, message, senderId) {
    const { isSenderAdmin, isBotAdmin } = await isAdmin(sock, chatId, senderId);

    if (!isBotAdmin) {
        await sock.sendMessage(chatId, { text: 'I need to be an admin to delete messages.' });
        return;
    }

    if (!isSenderAdmin) {
        await sock.sendMessage(chatId, { text: 'Only admins can use the .delete command.' });
        return;
    }

    const quotedMessage = message.message?.extendedTextMessage?.contextInfo?.stanzaId;
    const quotedParticipant = message.message?.extendedTextMessage?.contextInfo?.participant;

    if (quotedMessage) {
        await sock.sendMessage(chatId, { delete: { remoteJid: chatId, fromMe: false, id: quotedMessage, participant: quotedParticipant } });
    } else {
        await sock.sendMessage(chatId, { text: 'Please reply to a message you want to delete.' });
    }
}

export default {
  name: 'dlt',         // Unique name of the command
  description: 'deletes text',   // Optional, for help menus
  execute: async (...args) => {
    // Your logic here
    console.log('delete executed!');
  }
};
