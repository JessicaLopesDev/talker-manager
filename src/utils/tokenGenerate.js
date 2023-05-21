const crypto = require('crypto');

const generator = () => crypto.randomBytes(8).toString('hex');

module.exports = generator;
