import config from '../config.mjs';

const dares = [
    "Sing a song for the group!",
    "I dare you to send tirres!",
    "I dare you to send me 100kes",
    "I dare you to send me your hottest pic!"
];

async function dare(sock, chatId) {
    const randomDare = dares[Math.floor(Math.random() * dares.length)];
    await sock.sendMessage(chatId, { text: `🔥 Dare: ${randomDare}` });
}

export default {
  name: 'dare',         // Unique name of the command
  description: 'have fun with ToD',   // Optional, for help menus
  execute: async (...args) => {
    // Your logic here
    console.log('Dare executed!');
  }
};
