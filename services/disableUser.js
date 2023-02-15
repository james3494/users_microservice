const { makeUser } = require('../entities');

module.exports = {
  makeDisableUser ({ usersDb, MyError }) {
    return async function ({ _id } = {}) {
      if (!_id) {
        throw new MyError('You must supply a user id to disable a user.');
      }

      const userToDelete = await usersDb.findById({ _id });

      if (!userToDelete) {
        throw new MyError("No user found to disable.");
      }

      const user = makeUser(userToDelete);
      user.disable();

      const updated = await usersDb.update( user.getAll() );
      if (!updated) throw new Error("Error disabling user")
      else return user.getAll();
    };
  }
} ;
