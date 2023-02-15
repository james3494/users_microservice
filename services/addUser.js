const { makeUser } = require('../entities');

module.exports = {
   makeAddUser ({ usersDb, MyError }) {
    return async function (userInfo) {
      const user = makeUser(userInfo);
      const exists = await usersDb.findByEmail({ email: user.getEmail() });
      if (exists) {
        throw new MyError("User already exists with that email");
      }
      if (userInfo.password) user.resetPassword(userInfo.password);

      return usersDb.insert({
        ... user.getAll()
      });
    };
  }
};
