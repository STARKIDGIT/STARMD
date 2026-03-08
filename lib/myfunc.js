const chalk = require('chalk');

const color = (text, color) => {
    return chalk.keyword(color || 'green')(text);
};

const bgcolor = (text, bgcolor) => {
    return chalk.bgKeyword(bgcolor || 'green')(text);
};

const consoleColor = (text, color) => {
    return chalk.keyword(color || 'green')(text);
};

module.exports = { color, bgcolor, consoleColor };