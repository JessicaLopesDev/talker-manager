const token = require('crypto');

const generator = () => token.randomBytes(8).toString('hex');

module.exports = generator;
