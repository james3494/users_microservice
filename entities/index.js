

const { Id } = require('./Id');
const { hashMachine } = require('./hashMachine');
const { buildMakeUser } = require('./user');
const MyError = Error;

const makeUser = buildMakeUser({ Id, hashMachine, MyError });

module.exports = { makeUser };
