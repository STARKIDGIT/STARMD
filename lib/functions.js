const axios = require('axios');

async function getBuffer(url) {
    try {
        const res = await axios.get(url, { responseType: 'arraybuffer' });
        return res.data;
    } catch (e) {
        return null;
    }
}

function getAdmin(participants, user) {
    const participant = participants.find(p => p.id === user);
    return participant ? participant.admin : null;
}

module.exports = { getBuffer, getAdmin };