const { makeUser } = require('../entities');

module.exports = {
  makeDisableUser ({ usersDb }) {
    return async function ({ _id, email } = {}) {
      if (!_id && !email) {
        throw new Error('You must supply a user id or an email.');
      }

      const userToDelete = _id ? await usersDb.findById({ _id }) : await usersDb.findByEmail({ email });

      if (!userToDelete) {
        throw new Error("No user found to delete.");
      }

      const user = makeUser(userToDelete);
      user.disable();

      const updated = await usersDb.update( user.getAll() );
      if (!updated) throw new Error("Error disabling user")
      else return user.getAll();
    };
  }
} ;
