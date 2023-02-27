const { makeAddUser } = require('./addUser');
const { makeEditUser } = require('./editUser');
const { makeResetPassword } = require('./resetPassword');
const { makeValidateUser } = require('./validateUser');
const { makeFilterUsers } = require('./filterUsers');
const { usersDb } = require('../dataAccess');
const { throwError } = require('errorHandling');

const addUser = makeAddUser({ usersDb, throwError });
const editUser = makeEditUser({ usersDb, throwError });
const validateUser = makeValidateUser({ usersDb, throwError });
const filterUsers = makeFilterUsers({ usersDb, throwError });
const resetPassword = makeResetPassword({ usersDb, throwError });

const userService = Object.freeze({
  addUser,
  editUser,
  validateUser,
  filterUsers,
  resetPassword
});

module.exports = { ...userService };
