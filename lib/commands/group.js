const { getAdmin } = require('./functions'); // Need to create functions.js

module.exports = {
    pattern: 'join',
    handler: async(sock, m, args) => {
        if (!m.key.fromMe) return;
        const link = args[0];
        if (!link) return await sock.sendMessage(m.key.remoteJid, { text: 'Provide a group link!' });
        try {
            const code = link.split('https://chat.whatsapp.com/')[1];
            await sock.groupAcceptInvite(code);
            await sock.sendMessage(m.key.remoteJid, { text: 'Joined the group!' });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: 'Failed to join!' });
        }
    }
};

// Add more commands here