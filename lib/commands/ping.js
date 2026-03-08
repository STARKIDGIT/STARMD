module.exports = {
    pattern: 'ping',
    handler: async(sock, m, args) => {
        const start = Date.now();
        await sock.sendMessage(m.key.remoteJid, { text: 'Pong!' });
        const end = Date.now();
        const ping = end - start;
        await sock.sendMessage(m.key.remoteJid, { text: `Ping: ${ping}ms` });
    }
};