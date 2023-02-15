

const { Id } = require('./Id');
const { hashMachine } = require('./hashMachine');
const { buildMakeUser } = require('./user');

const makeUser = buildMakeUser({ Id, hashMachine });

module.exports = { makeUser };
