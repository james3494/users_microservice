
const { makeUser } = require('../entities');

module.exports = {
   makeLogUserIn ({ usersDb }) {
    return async function ({ email, password, stayLoggedIn, sessionID }) {

      if (!email) {
        throw new Error ("You must supply an email");
      }
      if (!password) {
        throw new Error ("You must supply a password");
      }
      const exists = await usersDb.findByEmail({ email });
      if (!exists)
        throw new Error("No user found with that email")

      const userFromDb = makeUser(exists);
      if (userFromDb.isLoggedin() && userFromDb.getSessionId() != sessionID)
        throw new Error("User already logged in elsewhere")

      if (userFromDb.isDisabled() == true)
        throw new Error("User has been disabled")


      if (userFromDb.isCorrectPassword(password)) {
        userFromDb.login(stayLoggedIn);

        const updated = await usersDb.update( userFromDb.getAll() );
        if (!updated) throw new Error("Error logging in user")
        else return userFromDb.getAll();

      } else throw new Error("Password incorrect")

    };
  }
};
