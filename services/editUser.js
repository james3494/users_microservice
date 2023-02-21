const { makeUser } = require('../entities');

module.exports = {
  makeEditUser ({ usersDb, throwError }) {
    return async function ({ ...userInfo }) {
      if (!userInfo._id) {
        throwError('You must supply a user id to edit a user.', 400);
      }

      const user = await usersDb.findById({ _id: userInfo._id });
      if (!user) {
        throwError("No user found to edit.", 400);
      }

      const toEdit = makeUser({ ...user, ...userInfo });

      const updated = await usersDb.update({
        _id: toEdit.getId(),
        disabled: toEdit.isDisabled(),
        lastName: toEdit.getLastName(),
        firstName: toEdit.getFirstName(),
        groups: toEdit.getGroups(),
        friends: toEdit.getFriends(),
        modifiedOn: Date.now(),
      });
      if (!updated) throwError("Error editing user", 500)

      return { disabled: !!updated };
    };
  }
} ;
