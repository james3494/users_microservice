

const { Id } = require('./Id');
const { hashMachine } = require('./hashMachine');
const { buildMakeUser } = require('./user');
const { throwError } = require('errorHandling');

function isValidEmail(email) {
  return email && typeof email === 'string' && /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}
function isValidName(name) {
  return name && typeof name === 'string' && /^[a-z ,.'-]{0,30}$/i.test(name);
}

const makeUser = buildMakeUser({ Id, hashMachine, throwError, isValidEmail, isValidName });

module.exports = { makeUser };
