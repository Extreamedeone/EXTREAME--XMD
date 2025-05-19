import { fileURLToPath} from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = [
    path.join(__dirname, 'src', 'extreame1.jpg'),
    path.join(__dirname, 'src', 'extreame2.jpg'),
    path.join(__dirname, 'src', 'extreame3.jpg')
];

const menuImage = images[Math.floor(Math.random() * images.length)];

import config from '../config.mjs';
import settings from '../settings.js';

const menu = `
╔════════════════════════════════════════╗
🌍 🚀 *WELCOME TO EXTREAME-XMD!* 🚀 🌍
🔥 Kenya's #1 Bot—Fast, Smart, Powerful! 🔥
╚════════════════════════════════════════╝

📸 **Menu Image:**
![Menu](file://${menuImage})

💬 **Prefix:** ${config.prefix}
👑 **Bot Owner:** ${config.ownerName}
🛠️ **Bot Version:** ${config.botVersion}
🌍 **Bot Region:** ${settings.region}
📌 **Bot Mode:** ${settings.botMode}
💎 **Exclusive Features:** ${settings.premium? '✅ Premium': '🚫 Free'}

🎉 **BOT COMMANDS LIST** 🎉

🔥 **GENERAL COMMANDS** 🔥
🛠️ **${config.prefix}ai** — AI-powered chat 🤖
🎵 **${config.prefix}lyrics** — Get song lyrics 🎶
✅ **${config.prefix}alive** — Check bot status 🟢
📡 **${config.prefix}ping** — Bot latency check ⚡
📜 **${config.prefix}news** — Get trending news 📰
🔨 **${config.prefix}alwaysonline** — Keep bot online 💡

🔥 **GROUP & ADMIN COMMANDS** 🔥
👑 **${config.prefix}owner** — Owner-only commands 🛡️
👥 **${config.prefix}promote** — Promote members 🚀
📢 **${config.prefix}tagall** — Mention all users 🔊
👮 **${config.prefix}kick** — Remove users from group 🚪
🛡️ **${config.prefix}antibadwords** — Filter bad language ⚠️
🔨 **${config.prefix}mute** — Mute group chat 🛑
🔗 **${config.prefix}resetlink** — Reset group invite 🌀
👋 **${config.prefix}welcome** — Greet new members 🎉
🎭 **${config.prefix}viewonce** — Unlock view-once media 👀
💎 **${config.prefix}setpp** — Change profile picture 📸
🚫 **${config.prefix}antilink** — Prevent spam links 🚫
🔗 **${config.prefix}antibot2** — Anti-bot protection 🛡️
🔍 **${config.prefix}hidetag** — Hide mentions 🕵️
🔎 **${config.prefix}grpmn** — Group management commands 👥

🔥 **FUN & MEDIA COMMANDS** 🔥
📸 **${config.prefix}meme** — Generate memes 😂
🎶 **${config.prefix}play** — Play songs 🎧
📢 **${config.prefix}quote** — Get inspirational quotes 📝
🕹️ **${config.prefix}tictactoe** — Play Tic-Tac-Toe 🎯
🌤️ **${config.prefix}weather** — Weather updates ☀️
💖 **${config.prefix}ship** — Ship users together ❤️
🤖 **${config.prefix}gpt** — Advanced AI chat 🤯
🎲 **${config.prefix}trivia** — Play trivia games 🧠
📸 **${config.prefix}tourl** — Convert media to URL 🌍
🎭 **${config.prefix}sticker** — Make stickers 📷
🚀 **${config.prefix}simage-alt** — Create alternative stickers 🎨
📜 **${config.prefix}textmaker** — Generate stylish text ✍️
🎭 **${config.prefix}emojiMix** — Combine emojis creatively 🧩
🎶 **${config.prefix}song** — Find song details 🎧
📸 **${config.prefix}instagram** — Instagram downloader 📷

🔥 **UTILITIES & TOOLS COMMANDS** 🔥
📝 **${config.prefix}help** — Get bot help menu 📌
🌎 **${config.prefix}translate** — Translate text 🌐
🔍 **${config.prefix}github** — Search GitHub repos 🖥️
💾 **${config.prefix}clearsession** — Clear bot session 🗑️
🔮 **${config.prefix}eightball** — Magic 8-ball predictions 🎱
🚀 **${config.prefix}statusmsg** — Set status message 📝
📜 **${config.prefix}compliment** — Send compliments 💖
💬 **${config.prefix}fact** — Discover facts 💡
💡 **${config.prefix}truth** — Truth or dare 🔥
🛡️ **${config.prefix}trust** — Verify trusted users ✅
📜 **${config.prefix}insult** — Send random insults 🔥
🎭 **${config.prefix}flirt** — Fun flirting lines 😉
🚀 **${config.prefix}topmembers** — Show top active members 👑
🔎 **${config.prefix}tag** — Mention users 🔊
🎨 **${config.prefix}stickertelegram** — Telegram sticker conversion 📦

🔥 **EXTRA COMMANDS** 🔥
🚀 **${config.prefix}ban** — Ban user from bot 🚫
🛡️ *${config.prefix}antidelete* — Prevent message deletion ⛔
🔗 *${config.prefix}attp* — Animated text sticker ✨
📜 *${config.prefix}dare* — Daring challenges 🔥
🎭 *${config.prefix}gif* — GIF search engine 🎥
📝 *${config.prefix}docx* — Convert text to document 📄
🔗 *${config.prefix}facebook* — Get Facebook video links 🎥
📜 *${config.prefix}trt* — Text recognition tools 📌
📍 *${config.prefix}tourl* — Convert files to URL 🔗
🛠️ *${config.prefix}cleartmp* — Clear temporary files 🗑️

🚀 *And many more commands! Type* _${config.prefix}menu_ *to explore!* 🚀

🔥 *EXTREAME-XMD—The Ultimate Bot Experience!* 🔥
💥 _Kenya’s finest, crafted for speed, style, and success!_ 💥
`;

export default {
  name: 'menu',         // Unique name of the command
  description: 'show available commands',   // Optional, for help menus
  execute: async (...args) => {
    // Your logic here
    console.log('menu executed!');
  }
};
