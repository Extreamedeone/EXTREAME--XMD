async function repo(sock, chatId) {
    const repoInfo = `*EXTREAME-XMD*

*📂 GitHub Repository:*
Keep an eye on https://github.com/Extreamedeone
Once done it will be uploaded there
Not yet published,belongs to owner only.UNDERMAINTENANCE!!!

_if you like the bot,wait and keep an eye,will be uploaded soon!_`;

    try {
        await sock.sendMessage(chatId, {
            text: repoInfo,
        });
    } catch (error) {
        console.error('Error in github command:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Error fetching repository information.' 
        });
    }
}

export default {
  name: 'repo',         // Unique name of the command
  description: 'Show repo info',   // Optional, for help menus
  execute: async (...args) => {
    // Your logic here
    console.log('repo executed!');
  }
};
