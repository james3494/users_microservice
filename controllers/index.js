
const { addUser, logUserIn, logUserOut, filterUsers, disableUser } = require('../services');
const { buildRegisterUser } = require('./registerUser');
const { buildLoginUser } = require('./loginUser');
const { buildLogoutUser } = require('./logoutUser');
const { buildGetCurrentUser } = require('./getCurrentUser');
const { buildDisableUser } = require('./disableUser');
const { catchError } = require('./catchError');


const userController = Object.freeze({
  registerUser : buildRegisterUser({ addUser, catchError }),
  loginUser: buildLoginUser({ logUserIn, catchError }),
  logoutUser: buildLogoutUser({ logUserOut, catchError }),
  getCurrentUser: buildGetCurrentUser({ filterUsers, catchError }),
  disableUser: buildDisableUser({ disableUser, catchError }),
});

module.exports = { ...userController };
