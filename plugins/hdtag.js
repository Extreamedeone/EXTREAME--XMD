import config from '../config.mjs';

const tagall = async (m, gss) => {
  try {
    // ✅ Ensure the function is async
    const botNumber = await gss.decodeJid(gss.user.id);
    const prefixMatch = m.body.match(/^[\\/!#.]/);
    const prefix = prefixMatch? prefixMatch[0]: '/';
    const cmd = m.body.startsWith(prefix)? m.body.slice(prefix.length).split(' ')[0].toLowerCase(): '';

    // ✅ Check for valid command
    const validCommands = ['hidetag'];
    if (!validCommands.includes(cmd)) return;

    // ✅ Fetch group metadata
    const groupMetadata = await gss.groupMetadata(m.from);
    const participants = groupMetadata.participants;
    const botAdmin = participants.find(p => p.id === botNumber)?.admin;
    const senderAdmin = participants.find(p => p.id === m.sender)?.admin;

    if (!m.isGroup) return m.reply("*🚫 This command is for groups only!*");

    if (!botAdmin) return m.reply("*⚠️ Please grant EXTREAME-XMD admin privileges!*");
    if (!senderAdmin) return m.reply("*🔒 Only group admins can use this command!*");

    // ✅ Extract the message to be sent
    let message = `📢 *Attention Everyone!*\n\n📝 *Message:* ${m.body.slice(prefix.length + cmd.length).trim() || 'No message provided'}\n\n`;

    // ✅ Tag all members in the group
    for (let participant of participants) {
      message += `💠 @${participant.id.split('@')[0]}\n`;
}

    gss.sendMessage(m.from, { text: message, mentions: participants.map(a => a.id)}, { quoted: m});
} catch (error) {
    console.error('❌ Error processing hidetag command:', error);
    await m.reply('*⚠️ An error occurred while processing the command.*');
}
};

export default {
  name: 'tagall',         // Unique name of the command
  description: 'tags all group members',   // Optional, for help menus
  execute: async (...args) => {
    // Your logic here
    console.log('tagall executed!');
  }
};
