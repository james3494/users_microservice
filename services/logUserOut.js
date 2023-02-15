const { makeUser } = require('../entities');

module.exports = {
   makeLogUserOut ({ usersDb }) {
    return async function ({ sessionID }) {

      const exists = await usersDb.findBySessionId({ sessionID });

      if (!exists) {
        throw new Error ("No user logged in");
      }

      const user = makeUser( exists );
      user.logout();
      const updated = await usersDb.update( user.getAll() );
      if (!updated) throw new Error("Error logging in user")
      else return user.getAll();
    };
  }
};
