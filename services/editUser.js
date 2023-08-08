const { makeUser } = require('../entities');
// to do: clean usersInfo so we don't accidentally set undefined stuff?
module.exports = {
  makeEditUser ({ usersDb, throwError }) {
    return async function ({ ...userInfo }) {
      if (!userInfo._id) {
        throwError({ 
          title: 'You must supply a user id to edit a user.', 
          error: "user-no-id-supplied", 
          status: 400
        });
      }

      const user = await usersDb.findById({ _id: userInfo._id });
      if (!user) {
        throwError({ 
          title: "No user found to edit.", 
          error:  "user-not-found", 
          status: 404, 
          detail: "No user found with the supplied _id"
        });
      }

      const toEdit = makeUser({ ...user, ...userInfo });

      return await usersDb.update({
        _id: toEdit.getId(),
        disabled: toEdit.isDisabled(),
        lastName: toEdit.getLastName(),
        firstName: toEdit.getFirstName(),
        groups: toEdit.getGroups(),
        friends: toEdit.getFriends(),
        admin: toEdit.getAdmin(),
        modifiedOn: Date.now(),
      });
    };
  }
} ;
