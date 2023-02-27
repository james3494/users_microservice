// TODO: make refresh token use different secret, and encode less information

const { addUser, validateUser, editUser, resetPassword, filterUsers } = require('../services');
const { buildRegisterUser } = require('./postUsers');
const { buildLoginUser } = require('./postSessions');
const { buildDisableUser } = require('./putDisabled');
const { buildResetPassword } = require('./putPassword');
const { buildEditUser } = require('./putUsers');
const { buildUserSearch } = require('./getUsers');
const { buildEditAdminRights } = require('./putAdmin');

const { catchError, throwError } = require('errorHandling');

const getLoggedIn = (httpRequest) => {
  const token = httpRequest.headers.Authorization.split(' ')[1];
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

const userController = Object.freeze({
  postUsers : buildRegisterUser({ addUser, catchError }),
  putDisabled: buildDisableUser({ editUser, catchError, throwError, getLoggedIn }),
  getUsers: buildUserSearch({ filterUsers, catchError }),
  putUsers: buildEditUser({ editUser, catchError, throwError, getLoggedIn }),
  putPassword: buildResetPassword({ resetPassword, catchError, throwError, getLoggedIn }),
  postSessions: buildLoginUser({ validateUser, catchError }),
  putAdmin: buildEditAdminRights({ editUser, catchError, throwError, getLoggedIn }),
});

module.exports = { ...userController };
