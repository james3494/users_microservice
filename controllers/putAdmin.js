// todo: finish this (work out ow to actually post things) - switch to an object for groups?
module.exports = {
  buildEditAdminRights ({ editAdminPermissions, catchError, throwError, getLoggedIn }) {
    return async function (httpRequest) {
     try {
       const { _id } = httpRequest.params;
       const { superAdmin, usersAdmin, huntedAdmin } = httpRequest.body;
       const loggedIn = getLoggedIn(httpRequest);

       if (!loggedIn) {
         throwError("You must be logged in to edit admin rights of a user.", 403);
       }
       if (usersAdmin !== undefined && !loggedIn.groups?.includes('usersAdmin') && !loggedIn.groups?.includes('superAdmin')) {
         throwError("You must be an admin to edit users admin rights of a user.", 403);
       }
       if (huntedAdmin !== undefined && !loggedIn.groups?.includes('huntedAdmin') && !loggedIn.groups?.includes('superAdmin')) {
         throwError("You must be an admin to edit hunted admin rights of a user.", 403);
       }
       if (superAdmin !== undefined && !loggedIn.groups?.includes('superAdmin')) {
         throwError("You must be a superadmin to edit superadmin rights of a user.", 403);
       }

       const { modifiedCount } = await editAdminPermissions({
          _id,
          superAdmin,
          usersAdmin,
          huntedAdmin
        });

       return {
         headers: { 'Content-Type': 'application/json' },
         statusCode: 201
       };
     } catch (e) {
       return catchError(e);
     }
    };
  }
};
