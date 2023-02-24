// TODO: make refresh token use different secret, and encode less information

const { addUser, logUserIn, editUser, resetPassword, filterUsers } = require('../services');
const { buildRegisterUser } = require('./registerUser');
const { buildLoginUser } = require('./loginUser');
const { buildDisableUser } = require('./disableUser');
const { buildResetPassword } = require('./resetPassword');
const { buildEditUser } = require('./editUser');
const { buildUserSearch } = require('./userSearch');
// const { buildRefreshToken } = require('./refreshToken');

const { catchError, throwError } = require('errorHandling');
const { generateToken, getLoggedIn } = require('authentication')({ privateKeyPath: "./private.pem", privateKeyPassword: '12345',   expiresIn: '7d' });
// const refreshAuth = require('authentication')({
//   privateKeyPath: "./private.pem",
//   publicKeyPath: "./public.pem",
//   privateKeyPassword: '12345',
//   expiresIn: '7d'
// });
// const [generateRefreshToken, decodeRefreshToken] = [refreshAuth.generateToken, refreshAuth.decodeToken];

const userController = Object.freeze({
  registerUser : buildRegisterUser({ addUser, catchError }),
  disableUser: buildDisableUser({ editUser, catchError, getLoggedIn, throwError }),
  userSearch: buildUserSearch({ filterUsers, catchError }),
  editUser: buildEditUser({ editUser, catchError, getLoggedIn, throwError }),
  resetPassword: buildResetPassword({ resetPassword, catchError, getLoggedIn, throwError }),
  loginUser: buildLoginUser({ logUserIn, catchError }),
  // loginUser: buildLoginUser({ logUserIn, catchError, generateToken, generateRefreshToken }),
  // refreshToken: buildRefreshToken({ filterUsers, catchError, getLoggedIn, throwError, generateToken, decodeRefreshToken }),
});

module.exports = { ...userController };
