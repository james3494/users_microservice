
module.exports = {
  buildEditUser ({ editUser, catchError, throwError, getLoggedIn }) {
    return async function (httpRequest) {
     try {
       const { firstName, lastName } = httpRequest.body;
       const { _id } = httpRequest.params;
       const loggedIn = getLoggedIn(httpRequest);

       if (!loggedIn) {
         throwError("You must be logged in to edit your user.", "user-not-logged-in", 403);
       }
       if (loggedIn._id !== _id && !loggedIn.groups?.includes('usersAdmin') && !loggedIn.groups?.includes('superAdmin')) {
         throwError("You must be an admin to edit other users.", "user-insufficient-admin-rights", 403);
       }
       // at the moment only fields to edit are firstname and lastname
       const { modifiedCount } = await editUser({
         _id,
         ...(firstName ? { firstName } : {}),
         ...(lastName ? { lastName } : {}),
       });

       return {
         headers: { 'Content-Type': 'application/json' },
         statusCode: 201,
         body: { modifiedCount, success: true }
       };
     } catch (e) {
       return catchError(e);
     }
    };
  }
};
