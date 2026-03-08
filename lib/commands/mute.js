module.exports = {
    pattern: 'mute',
    handler: async(sock, m, args) => {
        if (!m.key.remoteJid.endsWith('@g.us')) return await sock.sendMessage(m.key.remoteJid, { text: 'This is not a group!' });
        // Check if admin
        const groupMetadata = await sock.groupMetadata(m.key.remoteJid);
        const participant = groupMetadata.participants.find(p => p.id === m.key.participant);
        if (!participant || participant.admin === null) return await sock.sendMessage(m.key.remoteJid, { text: 'You are not admin!' });
        await sock.groupSettingUpdate(m.key.remoteJid, 'announcement');
        await sock.sendMessage(m.key.remoteJid, { text: 'Group muted!' });
    }
};