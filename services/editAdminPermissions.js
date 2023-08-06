const { makeUser } = require('../entities');

module.exports = {
  makeEditAdminPermissions ({ editUser, usersDb, throwError }) {
    return async function ({ _id, ...adminChanges }) {
      if (!_id) {
        throwError({
          title: 'You must supply a user id to edit a user.', 
          error: "user-no-id-supplied", 
          status: 400
        });
      }

      const userInfo = await usersDb.findById({ _id });
      if (!userInfo) {
        throwError({
          title: "No user found to edit.", 
          status: 404,
          error:  "user-not-found", 
          detail: "No user found with the supplied _id"
        });
      }
      let groups = userInfo.groups;
      Object.entries(adminChanges).forEach(([adminPower, hasIt]) => {
        if (hasIt === true && groups.indexOf(adminPower) === -1) {
          groups.push(adminPower)
        } else if (hasIt === false && groups.indexOf(adminPower) !== -1) {
          groups.splice(groups.indexOf(adminPower), 1)
        }
      })
      return await editUser({
        _id,
        groups
      })
    };
  }
};
