import config from './config.mjs';                
const settings = async (m, sock) => {               const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix)           ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
: '';                                               const text = m.body.slice(prefix.length + cmd.length).trim();                                     
  // ✅ Define valid commands
  const validCommands = ['settings'];
  if (!validCommands.includes(cmd)) return;

  if (cmd === "settings") {
    const start = new Date().getTime();
    await m.React('📚');
    const end = new Date().getTime();
    const responseTime = (end - start).toFixed(2);

    // ✅ Open settings menu with proper formatting
    const responseText = `
🔧 *BOT SETTINGS*
──────────────────
🔹 *Bot Prefix:* ${config.PREFIX}
🔹 *Bot Mode:* ${config.MODE}
🔹 *Theme:* ${config.OWNER_NAME}

🌐 *Auto Settings:*
✅ Auto Status View: ${config.AUTO_VIEW_STATUS}
✅ Auto Like: ${config.AUTOLIKE_STATUS}
✅ Auto Typing: ${config.AUTO_TYPING}
✅ Always Online: ${config.ALWAYS_ONLINE}

👑 *Owner Info:*
🆔 *Name:* ${config.OWNER_NAME}
📱 *Number:* ${config.OWNER_NUMBER}
🔑 *Session ID:* ${config.SESSION_ID}

⚡ *Bot Performance:*
📊 *Status:* Running smoothly ✅
⏱ *Response Time:* ${responseTime}ms
`.trim();

    await m.React('✅');
    sock.sendMessage(m.from, { text: responseText}, { quoted: m});
}
};

// ✅ Properly export function for plugins
export default settings;
