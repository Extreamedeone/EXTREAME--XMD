// plugins/alwaysOnline.js
import { logInfo, logSuccess, logWarning } from '../display.js';

let intervalId = null;

const command = 'alwaysonline';
const description = 'Toggle always-online mode to keep your WhatsApp status active.';

async function execute(sock, msg, args) {
  const sender = msg.key.remoteJid;

  if (!args[0] || !['on', 'off'].includes(args[0].toLowerCase())) {
    await sock.sendMessage(sender, {
      text: 'Usage:\n.alwaysonline on - Keep status always online\n.alwaysonline off - Disable it'
    });
    return;
  }

  if (args[0].toLowerCase() === 'on') {
    if (intervalId) {
      await sock.sendMessage(sender, { text: 'Always-online mode is already active.' });
      return;
    }

    intervalId = setInterval(() => {
      sock.sendPresenceUpdate('available', sender);
      logInfo(`[AlwaysOnline] Sent presence update to ${sender}`);
    }, 25 * 1000); // every 25 seconds

    await sock.sendMessage(sender, { text: '✅ Always-online mode activated. You will appear online.' });
    logSuccess(`[AlwaysOnline] Activated for ${sender}`);
  }

  if (args[0].toLowerCase() === 'off') {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      await sock.sendMessage(sender, { text: '❌ Always-online mode deactivated.' });
      logWarning(`[AlwaysOnline] Deactivated for ${sender}`);
    } else {
      await sock.sendMessage(sender, { text: 'Always-online mode is not active.' });
    }
  }
}
export default {
  name: 'alwaysonline',         // Unique name of the command
  description: 'Bot online',   // Optional, for help menus
  execute: async (...args) => {
    // Your logic here
    console.log('alwaysonline executed!');
  }
};
