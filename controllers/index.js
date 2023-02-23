
const { addUser, logUserIn, editUser, resetPassword, filterUsers } = require('../services');
const { buildRegisterUser } = require('./registerUser');
const { buildLoginUser } = require('./loginUser');
const { buildDisableUser } = require('./disableUser');
const { buildResetPassword } = require('./resetPassword');
const { buildEditUser } = require('./editUser');
const { buildUserSearch } = require('./userSearch');

const { catchError, throwError } = require('errorHandling');
const { generateToken, getUserFromReq } = require('authentication')({ privateKeyPath: "./private.pem", privateKeyPassword: '12345' });

const userController = Object.freeze({
  registerUser : buildRegisterUser({ addUser, catchError }),
  loginUser: buildLoginUser({ logUserIn, catchError, generateToken }),
  disableUser: buildDisableUser({ editUser, catchError, getUserFromReq, throwError }),
  userSearch: buildUserSearch({ filterUsers, catchError }),
  editUser: buildEditUser({ editUser, catchError, getUserFromReq, throwError }),
  resetPassword: buildResetPassword({ resetPassword, catchError, getUserFromReq, throwError }),
});

module.exports = { ...userController };
