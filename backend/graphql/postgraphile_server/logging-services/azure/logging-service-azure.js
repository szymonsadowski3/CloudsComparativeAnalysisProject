const fs = require('fs');
const util = require('util');
const log_file = fs.createWriteStream('/var/logs/output.log', {flags : 'w'});

function sendLog(message, level='info') {
    log_file.write(`[${level}]: ${util.format(message)}`);
}

module.exports = {
    sendLog,
};