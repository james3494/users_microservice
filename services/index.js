const { makeAddUser } = require('./addUser');
const { makeDisableUser } = require('./disableUser');
const { makeLogUserIn } = require('./logUserIn');
const { makeLogUserOut } = require('./logUserOut');
const { makeFilterUsers } = require('./filterUsers');
const { usersDb } = require('../dataAccess');
const MyError = Error;

const addUser = makeAddUser({ usersDb, MyError });
const disableUser = makeDisableUser({ usersDb, MyError });
const logUserIn = makeLogUserIn({ usersDb, MyError });
const logUserOut = makeLogUserOut({ usersDb, MyError });
const filterUsers = makeFilterUsers({ usersDb, MyError });

const userService = Object.freeze({
  addUser,
  disableUser,
  logUserIn,
  logUserOut,
  filterUsers
});

module.exports = { ...userService };
