const { makeUser } = require('../entities');

module.exports = {
   makeAddUser ({ usersDb, throwError }) {
    return async function (userInfo) {
      const user = makeUser(userInfo);
      const exists = await usersDb.findByEmail({ email: user.getEmail() });
      if (exists) {
        throwError("User already exists with that email", 400);
      }
      if (userInfo.password) user.resetPassword(userInfo.password);

      return await usersDb.insert({
        ... user.getAll()
      });
    };
  }
};
