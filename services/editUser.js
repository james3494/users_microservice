const { makeUser } = require('../entities');
// to do: clean usersInfo so we don't accidentally set undefined stuff?
module.exports = {
  makeEditUser ({ usersDb, throwError }) {
    return async function ({ ...userInfo }) {
      if (!userInfo._id) {
        throwError('You must supply a user id to edit a user.', "user-no-id-supplied", 400);
      }

      const user = await usersDb.findById({ _id: userInfo._id });
      if (!user) {
        throwError("No user found to edit.", "user-not-found", 404, "No user found with the supplied _id");
      }

      const toEdit = makeUser({ ...user, ...userInfo });

      return await usersDb.update({
        _id: toEdit.getId(),
        disabled: toEdit.isDisabled(),
        lastName: toEdit.getLastName(),
        firstName: toEdit.getFirstName(),
        groups: toEdit.getGroups(),
        friends: toEdit.getFriends(),
        modifiedOn: Date.now(),
      });
    };
  }
} ;
