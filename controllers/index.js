
const { addUser, logUserIn, disableUser } = require('../services');
const { buildRegisterUser } = require('./registerUser');
const { buildLoginUser } = require('./loginUser');
const { buildDisableUser } = require('./disableUser');

const { catchError, throwError } = require('errorHandling');
const { generateToken } = require('authentication')({ privateKeyPath: "./private.pem", privateKeyPassword: '12345' });

const userController = Object.freeze({
  registerUser : buildRegisterUser({ addUser, catchError }),
  loginUser: buildLoginUser({ logUserIn, catchError, generateToken }),
  disableUser: buildDisableUser({ disableUser, catchError }),
});

module.exports = { ...userController };
