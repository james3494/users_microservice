const { makeUser } = require('../entities');

module.exports = {
   makeLogUserOut ({ usersDb, throwError }) {
    return async function ({ _id }) {

      const exists = await usersDb.findById({ _id });

      if (!exists) {
        throwError ("No user logged in", 400);
      }

      const user = makeUser( exists );
      user.logout();
      const updated = await usersDb.update( user.getAll() );
      if (!updated) throwError("Error logging in user", 500)
      else return { ...user.getAll(), ...updated };
    };
  }
};
