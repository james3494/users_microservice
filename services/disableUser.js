const { makeUser } = require('../entities');

module.exports = {
  makeDisableUser ({ usersDb, throwError }) {
    return async function ({ _id } = {}) {
      if (!_id) {
        throwError('You must supply a user id to disable a user.', 400);
      }

      const user = await usersDb.findById({ _id });

      if (!user) {
        throwError("No user found to disable.", 400);
      }

      const toDisable = makeUser(user);
      toDisable.disable();

      const updated = await usersDb.update({
        _id: toDisable.getId(),
        disabled: toDisable.isDisabled()
      });
      if (!updated) throwError("Error disabling user", 500)

      return { disabled: !!updated };
    };
  }
} ;
