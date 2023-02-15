const { makeAddUser } = require('./addUser');
const { makeDisableUser } = require('./disableUser');
const { makeLogUserIn } = require('./logUserIn');
const { makeLogUserOut } = require('./logUserOut');
const { makeFilterUsers } = require('./filterUsers');
const { usersDb } = require('../dataAccess');

const addUser = makeAddUser({ usersDb });
const disableUser = makeDisableUser({ usersDb });
const logUserIn = makeLogUserIn({ usersDb });
const logUserOut = makeLogUserOut({ usersDb });
const filterUsers = makeFilterUsers({ usersDb });

const userService = Object.freeze({
  addUser,
  disableUser,
  logUserIn,
  logUserOut,
  filterUsers
});

module.exports = { ...userService };
