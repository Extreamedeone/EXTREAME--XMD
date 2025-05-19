import settings from '../settings.js';

const eightBallResponses = [
    "Yes, definitely!",
    "No way!",
    "Ask again later.",
    "It is certain.",
    "Very doubtful.",
    "Without a doubt.",
    "My reply is no.",
    "Signs point to yes."
];

async function eightBall(sock, chatId, question) {
    if (!question) {
        await sock.sendMessage(chatId, { text: 'Please ask a question!' });
        return;
    }

    const randomResponse = eightBallResponses[Math.floor(Math.random() * eightBallResponses.length)];
    await sock.sendMessage(chatId, { text: `🎱 ${randomResponse}` });
}

export default {
  name: 'eightBall',         // Unique name of the command
  description: 'fun ...',   // Optional, for help menus
  execute: async (...args) => {
    // Your logic here
    console.log('8ball executed!');
  }
};
