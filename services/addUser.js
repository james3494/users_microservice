const { makeUser } = require('../entities');

module.exports = {
   makeAddUser ({ usersDb, throwError }) {
    return async function (userInfo) {
      const user = makeUser(userInfo);
      const exists = await usersDb.findByEmail({ email: user.getEmail() });
      if (exists) {
        throwError({
          title: "User already exists with that email", 
          error: "user-already-exists", 
          status: 401, 
          detail: "Please login as a user already exists with that email address"
        });
      }
      if (userInfo.password) user.resetPassword(userInfo.password);

      return await usersDb.insert({
        ... user.getAll()
      });
    };
  }
};
