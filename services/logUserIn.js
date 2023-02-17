
const { makeUser } = require('../entities');

module.exports = {
   makeLogUserIn ({ usersDb, throwError }) {
    return async function ({ email, password, stayLoggedIn }) {

      if (!email) {
        throwError ("You must supply an email", 400);
      }
      if (!password) {
        throwError ("You must supply a password", 400);
      }
      const exists = await usersDb.findByEmail({ email });
      if (!exists)
        throwError("No user found with that email", 400)

      const userFromDb = makeUser(exists);
      if (userFromDb.isLoggedin())
        throwError("User already logged in elsewhere", 403)

      if (userFromDb.isDisabled() == true)
        throwError("User has been disabled", 403)


      if (userFromDb.isCorrectPassword(password)) {
        userFromDb.login(stayLoggedIn);

        const updated = await usersDb.update( userFromDb.getAll() );
        if (!updated) throwError("Error logging in user", 500)
        else return { ...userFromDb.getAll(), ...updated };

      } else throwError("Password incorrect", 401)

    };
  }
};
