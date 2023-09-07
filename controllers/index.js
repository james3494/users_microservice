
const { addUser, validateUser, editUser, resetPassword, filterUsers, removeUser } = require('../services');
const { buildRegisterUser } = require('./postUsers');
const { buildLoginUser } = require('./postAuth');
const { buildDisableUser } = require('./putDisabled');
const { buildResetPassword } = require('./putPassword');
const { buildEditUser } = require('./putUsers');
const { buildUserSearch } = require('./getUsers');
const { buildEditAdminRights } = require('./putAdmin');
const { buildDeleteUser } = require('./deleteUsers');

const throwError = require('errorHandling').buildThrowError({ logErrors: process.env.LOG_ERRORS });

const getLoggedIn = (httpRequest) => {
  try {
    let loggedIn = JSON.parse(httpRequest.headers["X-Current-User"]) || {};
    if (!loggedIn.admin) loggedIn.admin = {};
    return loggedIn;
  } catch (err) {
    throwError({
      title: "invalid user header passed",
      status: 500,
      error: "auth-invalid-user-header",
      detail:
        "A stringified object should be passed by the gateway to the microservice in a X-Current-User header",
    });
  }
};

const userController = Object.freeze({
  postUsers : buildRegisterUser({ addUser }),
  putDisabled: buildDisableUser({ editUser, throwError, getLoggedIn }),
  getUsers: buildUserSearch({ filterUsers, throwError, getLoggedIn }),
  putUsers: buildEditUser({ editUser, throwError, getLoggedIn }),
  putPassword: buildResetPassword({ resetPassword, throwError, getLoggedIn }),
  postAuth: buildLoginUser({ validateUser }),
  putAdmin: buildEditAdminRights({ editUser, throwError, getLoggedIn }),
  deleteUsers: buildDeleteUser({ removeUser, getLoggedIn, throwError })
});

module.exports = { ...userController };
