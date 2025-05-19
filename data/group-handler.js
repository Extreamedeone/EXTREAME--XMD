import moment from 'moment-timezone';
import config from '../config.mjs';
export default async function GroupParticipants(sock, { id, participants, action }) {
   try {
      const metadata = await sock.groupMetadata(id);
      for (const jid of participants) {
         let profile;
         try {
            profile = await sock.profilePictureUrl(jid, "image");
         } catch {
            // Use different local images based on action
            profile = action === "add"
              ? "media/extreame3.jpg"
              : "media/extreame4.jpg";
         }

         if (action == "add" && config.WELCOME) {
            const userName = jid.split("@")[0];
            const joinTime = moment.tz('Asia/Kolkata').format('HH:mm:ss');
            const joinDate = moment.tz('Asia/Kolkata').format('DD/MM/YYYY');
            const membersCount = metadata.participants.length;
            sock.sendMessage(id, {
               text: `> ʜᴇʟʟᴏ @${userName}! ᴡᴇʟᴄᴏᴍᴇ to *${metadata.subject}*.\n> ʏᴏᴜ ᴀʀᴇ ᴛʜᴇ ${membersCount}ᴛʜ ᴍᴇᴍʙᴇʀ.\n> ᴊᴏɪɴᴇᴅ ᴀᴛ: ${joinTime} ᴏɴ ${joinDate}`,
               contextInfo: {
                  mentionedJid: [jid],
                  externalAdReply: {
                     title: `Welcome`,
                     mediaType: 1,
                     previewType: 0,
                     renderLargerThumbnail: true,
                     thumbnailUrl: profile,
                     sourceUrl: 'https://sid-bhai.vercel.app'
                  }
               }
            });
         } else if (action == "remove" && config.WELCOME) {
            const userName = jid.split('@')[0];
            const leaveTime = moment.tz('Asia/Kolkata').format('HH:mm:ss');
            const leaveDate = moment.tz('Asia/Kolkata').format('DD/MM/YYYY');
            const membersCount = metadata.participants.length;
            sock.sendMessage(id, {
               text: `> ɢᴏᴏᴅʙʏᴇ @${userName} ғʀᴏᴍ ${metadata.subject}.\n> ᴡᴇ ᴀʀᴇ ɴᴏᴡ ${membersCount} ɪɴ ᴛʜᴇ ɢʀᴏᴜᴘ.\n> ʟᴇғᴛ ᴀᴛ: ${leaveTime} ᴏɴ ${leaveDate}`,
               contextInfo: {
                  mentionedJid: [jid],
                  externalAdReply: {
                     title: `Leave`,
                     mediaType: 1,
                     previewType: 0,
                     renderLargerThumbnail: true,
                     thumbnailUrl: profile,
                     sourceUrl: 'https://sid-bhai.vercel.app'
                  }
               }
            });
         }
      }
   } catch (e) {
      throw e;
   }
}
