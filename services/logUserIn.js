
const { makeUser } = require('../entities');

module.exports = {
   makeLogUserIn ({ usersDb, MyError }) {
    return async function ({ email, password, stayLoggedIn, sessionID }) {

      if (!email) {
        throw new MyError ("You must supply an email");
      }
      if (!password) {
        throw new MyError ("You must supply a password");
      }
      const exists = await usersDb.findByEmail({ email });
      if (!exists)
        throw new MyError("No user found with that email")

      const userFromDb = makeUser(exists);
      if (userFromDb.isLoggedin() && userFromDb.getSessionId() != sessionID)
        throw new MyError("User already logged in elsewhere")

      if (userFromDb.isDisabled() == true)
        throw new MyError("User has been disabled")


      if (userFromDb.isCorrectPassword(password)) {
        userFromDb.login(stayLoggedIn);

        const updated = await usersDb.update( userFromDb.getAll() );
        if (!updated) throw new MyError("Error logging in user")
        else return userFromDb.getAll();

      } else throw new MyError("Password incorrect")

    };
  }
};
