module.exports = {
    pattern: 'poll',
    handler: async(sock, m, args) => {
        const text = args.join(' ');
        if (!text.includes(';')) return await sock.sendMessage(m.key.remoteJid, { text: 'Usage: .poll question;option1,option2' });
        const [question, options] = text.split(';');
        const opts = options.split(',');
        await sock.sendMessage(m.key.remoteJid, {
            poll: {
                name: question,
                values: opts,
                selectableCount: 1
            }
        });
    }
};