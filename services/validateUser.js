
const { makeUser } = require('../entities');

module.exports = {
   makeValidateUser ({ usersDb, throwError }) {
    return async function ({ email, password }) {

      if (!email) {
        throwError ("You must supply an email", 400);
      }
      if (!password) {
        throwError ("You must supply a password", 400);
      }
      const exists = await usersDb.findByEmail({ email });
      if (!exists)
        throwError("No user found with that email", "user-not-found", 404)

      const userFromDb = makeUser(exists);

      if (userFromDb.isDisabled() == true)
        throwError("User has been disabled", "user-is-disabled", 403, "User has been set as disabled, only admins can undisable a user")


      if (userFromDb.isCorrectPassword(password)) {
        return {
          success: true,
          user: userFromDb.getAll()
        };
      } else throwError("Email or password incorrect", "auth-incorrect-credentials", 401, "An incorrect password was supplied")

    };
  }
};
