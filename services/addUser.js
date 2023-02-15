const { makeUser } = require('../entities');

module.exports = {
   makeAddUser ({ usersDb }) {
    return async function (userInfo) {
      const user = makeUser(userInfo);
      const exists = await usersDb.findByEmail({ email: user.getEmail() });
      if (exists) {
        return {
          error: true,
          message: "User already exists with that email"
        };
      }
      if (userInfo.password) user.resetPassword(userInfo.password);

      return usersDb.insert({
        ... user.getAll()
      });
    };
  }
};
