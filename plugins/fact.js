import axios from 'axios';

async function fact(sock, chatId) {
    try {
        const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
        const fact = response.data.text;
        await sock.sendMessage(chatId, { text: fact });
    } catch (error) {
        console.error('Error fetching fact:', error);
        await sock.sendMessage(chatId, { text: 'Sorry, I could not fetch a fact right now.' });
    }
};
export default {
  name: 'fact',         // Unique name of the command
  description: 'fun',   // Optional, for help menus
  execute: async (...args) => {
    // Your logic here
    console.log('Facts executed!');
  }
};
