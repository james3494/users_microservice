

const { Id } = require('./Id');
const { hashMachine } = require('./hashMachine');
const { buildMakeUser } = require('./user');
const { throwError } = require('errorHandling');

const makeUser = buildMakeUser({ Id, hashMachine, throwError });

module.exports = { makeUser };
