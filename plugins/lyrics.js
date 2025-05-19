import fetch from 'node-fetch';

async function lyrics(sock, chatId, songTitle) {
    if (!songTitle) {
        await sock.sendMessage(chatId, { 
            text: '🔍 Please enter the song name to get the lyrics! Usage: *lyrics <song name>*'
        });
        return;
    }

    try {
        // Fetch song lyrics using the some-random-api.com API
        const apiUrl = `https://some-random-api.com/lyrics?title=${encodeURIComponent(songTitle)}`;
        const res = await fetch(apiUrl);
        
        if (!res.ok) {
            throw await res.text();
        }
        
        const json = await res.json();
        
        if (!json.lyrics) {
            await sock.sendMessage(chatId, { 
                text: `❌ Sorry, I couldn't find any lyrics for "${songTitle}".`
            });
            return;
        }
        
        // Sending the formatted result to the user
        await sock.sendMessage(chatId, {
            text: `🎵 *Song Lyrics* 🎶\n\n▢ *Title:* ${json.title || songTitle}\n▢ *Artist:* ${json.author || 'Unknown'}\n\n📜 *Lyrics:*\n${json.lyrics}\n\n Enjoy! 🎧 🎶`
        });
    } catch (error) {
        console.error('Error in lyrics command:', error);
        await sock.sendMessage(chatId, { 
            text: `❌ An error occurred while fetching the lyrics for "${songTitle}".`
        });
    }
}

export default {
  name: 'lyrics',         // Unique name of the command
  description: 'finds song lyrics',   // Optional, for help menus
  execute: async (...args) => {
    // Your logic here
    console.log('lyrics executed!');
  }
};
