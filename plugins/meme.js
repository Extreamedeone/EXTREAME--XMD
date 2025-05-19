import axios from 'axios';

async function meme(sock, chatId) {
    try {
        // Fetch memes from the Imgflip API
        const response = await axios.get('https://api.imgflip.com/get_memes');
        
        if (response.data.success) {
            const memes = response.data.data.memes;

            // Pick a random meme from the list
            const randomMeme = memes[Math.floor(Math.random() * memes.length)];

            // Send the meme image to the chat
            await sock.sendMessage(chatId, { image: { url: randomMeme.url }, caption: randomMeme.name });
        } else {
            await sock.sendMessage(chatId, { text: 'Failed to fetch memes. Please try again later.' });
        }
    } catch (error) {
        console.error('Error fetching meme:', error);
        await sock.sendMessage(chatId, { text: 'An error occurred while fetching a meme.' });
    }
}

export default {
  name: 'meme',         // Unique name of the command
  description: 'create memes',   // Optional, for help menus
  execute: async (...args) => {
    // Your logic here
    console.log('meme executed!');
  }
};
