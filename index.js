const { makeWASocket, DisconnectReason, useMultiFileAuthState, makeCacheableSignalKeyStore, Browsers } = require('wileys');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const fs = require('fs');
const path = require('path');
const { color } = require('./lib/myfunc');
const { loadCommands, handleMessage } = require('./lib/handler');

require('./config');

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState(path.join(__dirname, 'session'));

    const sock = makeWASocket({
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' }))
        },
        printQRInTerminal: true,
        logger: pino({ level: 'silent' }),
        browser: Browsers.macOS('Desktop'),
    });

    sock.ev.on('connection.update', async(update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect ? .error instanceof Boom) ?
                lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut :
                true;
            console.log(color('Connection closed due to', 'red'), lastDisconnect ? .error, ', reconnecting', shouldReconnect);
            if (shouldReconnect) {
                connectToWhatsApp();
            }
        } else if (connection === 'open') {
            console.log(color('Connected to WhatsApp', 'green'));
        }
    });
}
});

sock.ev.on('creds.update', saveCreds);

sock.ev.on('messages.upsert', async(m) => {
    handleMessage(sock, m.messages[0]);
});

// Load commands
loadCommands(path.join(__dirname, 'lib/commands'));

return sock;
}

connectToWhatsApp();