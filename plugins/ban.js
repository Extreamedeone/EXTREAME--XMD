import fs from 'fs';

async function ban(sock, chatId, message) {
    let userToBan;
    
    // Check for mentioned users
    if (message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0) {
        userToBan = message.message.extendedTextMessage.contextInfo.mentionedJid[0];
    }
    // Check for replied message
    else if (message.message?.extendedTextMessage?.contextInfo?.participant) {
        userToBan = message.message.extendedTextMessage.contextInfo.participant;
    }
    
    if (!userToBan) {
        await sock.sendMessage(chatId, { 
            text: 'Please mention the user or reply to their message to ban!', 
        });
        return;
    }

    try {
        // Add user to banned list
        const bannedUsers = JSON.parse(fs.readFileSync('./data/banned.json'));
        if (!bannedUsers.includes(userToBan)) {
            bannedUsers.push(userToBan);
            fs.writeFileSync('./data/banned.json', JSON.stringify(bannedUsers, null, 2));
            
            await sock.sendMessage(chatId, { 
                text: `Successfully banned @${userToBan.split('@')[0]}!`,
                mentions: [userToBan],
            });
        } else {
            await sock.sendMessage(chatId, { 
                text: `${userToBan.split('@')[0]} is already banned!`,
                mentions: [userToBan],
            });
        }
    } catch (error) {
        console.error('Error in ban command:', error);
        await sock.sendMessage(chatId, { text: 'Failed to ban user!', ...channelInfo });
    }
}

export default {
  name: 'ban',         // Unique name of the command
  description: 'bans users',   // Optional, for help menus
  execute: async (...args) => {
    // Your logic here
    console.log('ban executed!');
  }
};
