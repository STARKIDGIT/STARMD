const fs = require('fs');
const path = require('path');

const commands = new Map();

function loadCommands(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            loadCommands(filePath);
        } else if (file.endsWith('.js')) {
            const command = require(filePath);
            if (command.pattern && command.handler) {
                commands.set(command.pattern, command);
            }
        }
    }
}

function handleMessage(sock, m) {
    const text = m.message ? .conversation || m.message ? .extendedTextMessage ? .text || '';
    if (!text.startsWith(global.prefix)) return;

    const args = text.slice(global.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    const cmd = commands.get(command);
    if (cmd) {
        cmd.handler(sock, m, args);
    }
}

module.exports = { loadCommands, handleMessage, commands };