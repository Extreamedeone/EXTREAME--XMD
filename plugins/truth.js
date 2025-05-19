const truths = [
    "What's your biggest fear?",
    "What was your most embarrassing moment?",
    "If you could be invisible for a day, what would you do?",
    "Who was your first crush?",
    "Do you love sex?",
    "Are you dating?",
    "What turns you on?",
    "What’s one thing you’ve never told anyone?"
];

async function truth(sock, chatId) {
    const randomTruth = truths[Math.floor(Math.random() * truths.length)];
    await sock.sendMessage(chatId, { text: `🔮 Truth: ${randomTruth}` });
}
export default {
  name: 'truth',         // Unique name of the command
  description: 'fun',   // Optional, for help menus
  execute: async (...args) => {
    // Your logic here
    console.log('truth executed!');
  }
};
