
const crypto = require('crypto');


const hashMachine = Object.freeze({
  getDefaultPassword() {
    return crypto.randomBytes(24).toString('base64');
  },
  hash(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 10000, 128, 'sha256').toString('hex');
  },
  genSalt() {
    return crypto.randomBytes(24).toString('base64');
  },
  isValidHash(hash) {
    // this should be improved
    return hash.length > 0;
  },
  isValidSalt(salt) {
    // this should be improved
    return salt.length > 0;
  },
});

module.exports = {
  hashMachine
};
