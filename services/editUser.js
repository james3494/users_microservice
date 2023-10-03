const { makeUser } = require('../entities');

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
      if (userInfo.email && userInfo.email !== user.email) {
        const exists = await usersDb.findByEmail({ email: userInfo.email });
        if (exists) {
          throwError({
            title: "User already exists with that email", 
            error: "user-already-exists", 
            status: 403, 
            detail: "You cannot edit your email to this as a user already exists with that email"
          });
        }
      }

      const toEdit = makeUser({ ...user, ...userInfo });

      return await usersDb.update({
        _id: toEdit.getId(),
        disabled: toEdit.isDisabled(),
        lastName: toEdit.getLastName(),
        email: toEdit.getEmail(),
        firstName: toEdit.getFirstName(),
        groups: toEdit.getGroups(),
        friends: toEdit.getFriends(),
        admin: toEdit.getAdmin(),
        photo: toEdit.getPhoto(),
        phone: toEdit.getPhone(),
        subscription: toEdit.getSubscription(),
        modifiedOn: Date.now(),
      });
    };
  }
} ;
