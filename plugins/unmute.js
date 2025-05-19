async function unmute(sock, chatId) {
    await sock.groupSettingUpdate(chatId, 'not_announcement'); // Unmute the group
    await sock.sendMessage(chatId, { text: 'The group has been unmuted.' });
}
export default {
  name: 'unmute',         // Unique name of the command
  description: 'unmute group',   // Optional, for help menus
  execute: async (...args) => {
    // Your logic here
    console.log('unmute executed!');
  }
};
