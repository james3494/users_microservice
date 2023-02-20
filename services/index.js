const { makeAddUser } = require('./addUser');
const { makeDisableUser } = require('./disableUser');
const { makeLogUserIn } = require('./logUserIn');
const { makeFilterUsers } = require('./filterUsers');
const { usersDb } = require('../dataAccess');
const { throwError } = require('errorHandling');

const addUser = makeAddUser({ usersDb, throwError });
const disableUser = makeDisableUser({ usersDb, throwError });
const logUserIn = makeLogUserIn({ usersDb, throwError });
const filterUsers = makeFilterUsers({ usersDb, throwError });

const userService = Object.freeze({
  addUser,
  disableUser,
  logUserIn,
  filterUsers
});

module.exports = { ...userService };
