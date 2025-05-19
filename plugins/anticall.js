import config from '../config.mjs';

const callWarnings = new Map();

async function antiCall(sock, chatId, callInfo) {
    try {
        const caller = callInfo.peerJid;

        if (!caller) return;

        if (!callWarnings.has(caller)) {
            callWarnings.set(caller, 1);
} else {
            callWarnings.set(caller, callWarnings.get(caller) + 1);
}

        const warningCount = callWarnings.get(caller);

        if (warningCount>= 3) {
            await sock.sendMessage(caller, { text: `🚫 *You have been warned 3 times for making calls. You are now blocked!*`});

            // Block the caller
            await sock.updateBlockStatus(caller, "block");
            callWarnings.delete(caller);
} else {
            await sock.sendMessage(caller, { text: `⚠️ *Warning ${warningCount}/3: Please do not make calls to this bot!*`});

            console.log(`⚠️ Warning issued (${warningCount}/3) to: ${caller}`);
}
} catch (error) {
        console.error('Error in antiCall command:', error);
}
}

export default {
  name: 'antiCall',         // Unique name of the command
  description: 'No calls',   // Optional, for help menus
  execute: async (...args) => {
    // Your logic here
    console.log('antiCall executed!');
  }
};
