module.exports = {
    pattern: 'ginfo',
    handler: async(sock, m, args) => {
        if (!m.key.remoteJid.endsWith('@g.us')) return await sock.sendMessage(m.key.remoteJid, { text: 'This is not a group!' });
        const groupMetadata = await sock.groupMetadata(m.key.remoteJid);
        const info = `
Group Info:
ID: ${groupMetadata.id}
Name: ${groupMetadata.subject}
Members: ${groupMetadata.participants.length}
Owner: ${groupMetadata.owner}
        `;
        await sock.sendMessage(m.key.remoteJid, { text: info });
    }
};