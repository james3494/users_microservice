
const { addUser, validateUser, editUser, resetPassword, filterUsers } = require('../services');
const { buildRegisterUser } = require('./postUsers');
const { buildLoginUser } = require('./postAuth');
const { buildDisableUser } = require('./putDisabled');
const { buildResetPassword } = require('./putPassword');
const { buildEditUser } = require('./putUsers');
const { buildUserSearch } = require('./getUsers');
const { buildEditAdminRights } = require('./putAdmin');

const throwError = require('errorHandling').buildThrowError({ logErrors: process.env.LOG_ERRORS });

const getLoggedIn = (httpRequest) => {
  const token = httpRequest.headers.Authorization.split(' ')[1];
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

const userController = Object.freeze({
  postUsers : buildRegisterUser({ addUser }),
  putDisabled: buildDisableUser({ editUser, throwError, getLoggedIn }),
  getUsers: buildUserSearch({ filterUsers }),
  putUsers: buildEditUser({ editUser, throwError, getLoggedIn }),
  putPassword: buildResetPassword({ resetPassword, throwError, getLoggedIn }),
  postAuth: buildLoginUser({ validateUser }),
  putAdmin: buildEditAdminRights({ editUser, throwError, getLoggedIn }),
});

module.exports = { ...userController };
