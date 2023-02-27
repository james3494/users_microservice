const { makeUser } = require('../entities');

module.exports = {
  makeResetPassword ({ usersDb, throwError }) {
    return async function ({ _id, oldPassword, newPassword }) {
      if (!_id) {
        throwError('You must supply a user id to reset the password.', 400);
      }

      const userJson = await usersDb.findById({ _id });
      if (!userJson) {
        throwError("No user found.", 400);
      }

      const user = makeUser(userJson);

      if (user.isCorrectPassword(oldPassword)) {
        user.resetPassword(newPassword);
        return await usersDb.update({
          _id: user.getId(),
          modifiedOn: Date.now(),
          hash: user.getHash(),
        });

      } else throwError("Old password incorrect.", 401)

    };
  }
} ;