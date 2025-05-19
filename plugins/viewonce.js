import { downloadContentFromMessage } from '@whiskeysockets/baileys';
import settings from '../settings.js';
import fs from 'fs';
import path from 'path';

async function vv(sock, chatId, message) {
    try {
        // Get quoted message with better error handling
        const quotedMessage = message.message?.extendedTextMessage?.contextInfo?.quotedMessage ||
                            message.message?.imageMessage ||
                            message.message?.videoMessage;

        if (!quotedMessage) {
            await sock.sendMessage(chatId, { 
                text: '❌ Please reply to a view once message!',
                ...channelInfo
            });
            return;
        }

        // Enhanced view once detection
        const isViewOnceImage = quotedMessage.imageMessage?.viewOnce === true || 
                              quotedMessage.viewOnceMessage?.message?.imageMessage ||
                              message.message?.viewOnceMessage?.message?.imageMessage;
                              
        const isViewOnceVideo = quotedMessage.videoMessage?.viewOnce === true || 
                              quotedMessage.viewOnceMessage?.message?.videoMessage ||
                              message.message?.viewOnceMessage?.message?.videoMessage;

        // Get the actual message content
        let mediaMessage;
        if (isViewOnceImage) {
            mediaMessage = quotedMessage.imageMessage || 
                         quotedMessage.viewOnceMessage?.message?.imageMessage ||
                         message.message?.viewOnceMessage?.message?.imageMessage;
        } else if (isViewOnceVideo) {
            mediaMessage = quotedMessage.videoMessage || 
                         quotedMessage.viewOnceMessage?.message?.videoMessage ||
                         message.message?.viewOnceMessage?.message?.videoMessage;
        }

        if (!mediaMessage) {
            console.log('Message structure:', JSON.stringify(message, null, 2));
            await sock.sendMessage(chatId, { 
                text: '❌ Could not detect view once message! Please make sure you replied to a view once image/video.',
                ...channelInfo
            });
            return;
        }

        // Handle view once image
        if (isViewOnceImage) {
            try {
                console.log('📸 Processing view once image...');
                const stream = await downloadContentFromMessage(mediaMessage, 'image');
                let buffer = Buffer.from([]);
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk]);
                }

                const caption = mediaMessage.caption || '';
                
                await sock.sendMessage(chatId, { 
                    image: buffer,
                    caption: `*💀 EXTREAME-XMD terror 💀*\n\n*Type:* Image 📸\n${caption ? `*Caption:* ${caption}` : ''}`,
                });
                console.log('✅ View once image processed successfully');
                return;
            } catch (err) {
                console.error('❌ Error downloading image:', err);
                await sock.sendMessage(chatId, { 
                    text: '❌ Failed to process view once image! Error: ' + err.message,
                });
                return;
            }
        }

        // Handle view once video
        if (isViewOnceVideo) {
            try {
                console.log('📹 Processing view once video...');
                
                // Create temp directory if it doesn't exist
                const tempDir = path.join(__dirname, '../temp');
                if (!fs.existsSync(tempDir)) {
                    fs.mkdirSync(tempDir);
                }

                const tempFile = path.join(tempDir, `temp_${Date.now()}.mp4`);
                const stream = await downloadContentFromMessage(mediaMessage, 'video');
                const writeStream = fs.createWriteStream(tempFile);
                
                for await (const chunk of stream) {
                    writeStream.write(chunk);
                }
                writeStream.end();

                // Wait for file to be written
                await new Promise((resolve) => writeStream.on('finish', resolve));

                const caption = mediaMessage.caption || '';

                await sock.sendMessage(chatId, { 
                    video: fs.readFileSync(tempFile),
                    caption: `*💀 EXTREAME-XMD 💀 Pilato amekataa *\n\n*Type:* Video 📹\n${caption ? `*Caption:* ${caption}` : ''}`,
                });

                // Clean up temp file
                fs.unlinkSync(tempFile);
                
                console.log('✅ View once video processed successfully');
                return;
            } catch (err) {
                console.error('❌ Error processing video:', err);
                await sock.sendMessage(chatId, { 
                    text: '❌ Failed to process view once video! Error: ' + err.message,
                });
                return;
            }
        }

        // If we get here, it wasn't a view once message
        await sock.sendMessage(chatId, { 
            text: '❌ This is not a view once message! Please reply to a view once image/video.',
        });

    } catch (error) {
        console.error('❌ Error in viewonce command:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Error processing view once message! Error: ' + error.message,
        });
    }
}
export default {
  name: 'vv',         // Unique name of the command
  description: 'extract viewonce media',   // Optional, for help menus
  execute: async (...args) => {
    // Your logic here
    console.log('vv executed!');
  }
};
