

const { Id } = require('./Id');
const { hashMachine } = require('./hashMachine');
const { buildMakeUser } = require('./user');
const throwError = require('errorHandling').buildThrowError({ logErrors: process.env.LOG_ERRORS });

function isValidEmail(email) {
  return email && typeof email === 'string' && /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}
function isValidName(name) { // string up to 30 characters long 
  return name && typeof name === 'string' && /^[a-zA-Z '-]{0,30}$/i.test(name);
}

const makeUser = buildMakeUser({ Id, hashMachine, throwError, isValidEmail, isValidName });

module.exports = { makeUser };
