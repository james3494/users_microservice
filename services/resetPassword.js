const { makeUser } = require('../entities');

module.exports = {
  makeResetPassword ({ usersDb, throwError }) {
    return async function ({ _id, oldPassword, newPassword }) {
      if (!_id) {
        throwError('You must supply a user id to reset the password.', "user-no-id-supplied", 400);
      }

      const userJson = await usersDb.findById({ _id });
      if (!userJson) {
        throwError("No user found.", 404, "user-not-found", "No user found with the given _id");
      }

      const user = makeUser(userJson);

      if (user.isCorrectPassword(oldPassword)) {
        user.resetPassword(newPassword);
        return await usersDb.update({
          _id: user.getId(),
          modifiedOn: Date.now(),
          hash: user.getHash(),
        });

      } else throwError("Password incorrect.", "user-auth-credentials-incorrect", 401, "Unable to reset password as the old password given is incorrect")

    };
  }
} ;
