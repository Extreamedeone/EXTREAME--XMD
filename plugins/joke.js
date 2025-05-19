import axios from 'axios';

async function joke(sock, chatId) {
    try {
        const response = await axios.get('https://icanhazdadjoke.com/', {
            headers: { Accept: 'application/json' }
        });
        const joke = response.data.joke;
        await sock.sendMessage(chatId, { text: joke });
    } catch (error) {
        console.error('Error fetching joke:', error);
        await sock.sendMessage(chatId, { text: 'Sorry, I could not fetch a joke right now.' });
    }
};
export default {
  name: 'joke',         // Unique name of the command
  description: 'fun jokes',   // Optional, for help menus
  execute: async (...args) => {
    // Your logic here
    console.log('joke executed!');
  }
};
