// todo: finish this (work out ow to actually post things)
// this is an overwrite, potentially we want a patch to?
module.exports = {
  buildEditAdminRights ({ editUser, throwError, getLoggedIn }) {
    return async function (httpRequest) {
      const { _id } = httpRequest.params;
      const { admin } = httpRequest.body;
      const loggedIn = getLoggedIn(httpRequest);

      if (!loggedIn) {
        throwError({ 
          title: "You must be logged in to edit admin rights of a user.", 
          error: "user-not-logged-in", 
          status: 403
      });
      }
      if (admin.users !== undefined && !loggedIn.admin.users && !loggedIn.admin.super) {
        throwError({ 
          title: "You must be an admin to edit users admin rights of a user.", 
          error: "user-insufficient-admin-rights", 
          status: 403
      });
      }
      if (admin.takeout !== undefined && !loggedIn.admin.takeout && !loggedIn.admin.super) {
        throwError({ 
          title: "You must be an admin to edit takeout admin rights of a user.", 
          error: "user-insufficient-admin-rights", 
          status: 403
      });
      }
      if (admin.super !== undefined && !loggedIn.admin.super) {
        throwError({ 
          title: "You must be a super admin to edit super rights of a user.", 
          error: "user-insufficient-admin-rights", 
          status: 403
      });
      }

      const { modifiedCount } = await editUser({
        _id,
        admin
      });

      return {
        headers: { 'Content-Type': 'application/json' },
        status: 201
      };
    };
  }
};
