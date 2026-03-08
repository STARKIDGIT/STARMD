module.exports = {
    pattern: 'menu',
    handler: async(sock, m, args) => {
        const menuText = `
*STARMD Bot Menu*

Commands:
- .menu - Show this menu
- .ping - Check bot status
- .info - Bot info

More commands coming soon...
        `;
        await sock.sendMessage(m.key.remoteJid, { text: menuText });
    }
};