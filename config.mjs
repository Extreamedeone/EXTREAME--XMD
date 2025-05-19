const config = {
    PREFIX: [".", "!", "@", "#", "*"], //Bot prefix                                                     OWNER_NAME: "Extreame", //Bot owner
    OWNER_NUMBER: "254791231068@s.whatsapp.net", // ✅ Bot owner's WhatsApp number
    BOT_NAME: "EXTREAME-XMD", // ✅ Bot display name
    SESSION_NAME: "session", // ✅ Session file name
    GROUP_ONLY: false, // ✅ Set to true if bot should only respond in groups
    PRIVATE_ONLY: false, // ✅ Set to true if bot should only respond in private chats
    AUTO_READ: true, // ✅ If true, bot will automatically read incoming messages
    LOG_LEVEL: "info", // ✅ Logging level ("debug", "info", "warn", "error")
    ANTI_LINK: true, // ✅ Set to true if bot should automatically remove links in groups
    DATABASE_PATH: "./database/", // ✅ Path to database storage
    PLUGINS_PATH: "./plugins/", // ✅ Folder where command plugins are stored
    MEDIA_PATH: "./src/", // ✅ Folder for media files
    STICKER_AUTHOR: "EXTREAME-XMD", // ✅ Author name for stickers
    STICKER_PACKNAME: "XMD Pack", // ✅ Sticker pack name
    TIMEZONE: "Africa/Nairobi", // ✅ Timezone for timestamps
    BOT_VERSION: "1.0.0", // ✅ Bot version
    COMMAND_COOLDOWN: 3, // ✅ Cooldown time for commands (seconds)
    MAX_SESSION_TIMEOUT: 86400000, // ✅ Max bot session timeout (milliseconds)
};
export default config;
