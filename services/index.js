const { makeAddUser } = require('./addUser');
const { makeEditUser } = require('./editUser');
const { makeResetPassword } = require('./resetPassword');
const { makeLogUserIn } = require('./logUserIn');
const { makeFilterUsers } = require('./filterUsers');
const { usersDb } = require('../dataAccess');
const { throwError } = require('errorHandling');

const addUser = makeAddUser({ usersDb, throwError });
const editUser = makeEditUser({ usersDb, throwError });
const logUserIn = makeLogUserIn({ usersDb, throwError });
const filterUsers = makeFilterUsers({ usersDb, throwError });
const resetPassword = makeResetPassword({ usersDb, throwError });

const userService = Object.freeze({
  addUser,
  editUser,
  logUserIn,
  filterUsers,
  resetPassword
});

module.exports = { ...userService };
