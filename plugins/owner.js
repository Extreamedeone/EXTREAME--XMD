import settings from '../settings.js';

async function owner(sock, chatId) {
    const vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${settings.botOwner}
TEL;waid=${settings.ownerNumber}:${settings.ownerNumber}
END:VCARD
`;

    await sock.sendMessage(chatId, {
        contacts: { displayName: settings.botOwner, contacts: [{ vcard }] },
    });
}

export default {
  name: 'owner',         // Unique name of the command
  description: 'bot owner',   // Optional, for help menus
  execute: async (...args) => {
    // Your logic here
    console.log('owner executed!');
  }
};
