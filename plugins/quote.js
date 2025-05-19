import axios from 'axios';

async function quote(sock, chatId) {
    try {
        const response = await axios.get('https://zenquotes.io/api/random', {
            httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false })
        });
        const quote = response.data[0];
        await sock.sendMessage(chatId, { 
            text: `"${quote.q}"\n- ${quote.a}`
        });
    } catch (error) {
        console.error('Error fetching quote:', error);
        await sock.sendMessage(chatId, { 
            text: 'Sorry, I could not fetch a quote right now.'
        });
    }
};
export default {
  name: 'quote',         // Unique name of the command
  description: 'wise words',   // Optional, for help menus
  execute: async (...args) => {
    // Your logic here
    console.log('quote executed!');
  }
};
