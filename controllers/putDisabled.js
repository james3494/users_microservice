
module.exports = {
  buildDisableUser ({ editUser, catchError, throwError, getLoggedIn }) {
    return async function (httpRequest) {
     try {
       const { _id } = httpRequest.params;
       const { disabled } = httpRequest.body;
       const loggedIn = getLoggedIn(httpRequest);

       if (!loggedIn) {
         throwError("You must be logged in to disable / undisable a user.", 403);
       }

       if (loggedIn._id !== _id && !loggedIn.groups?.includes('usersAdmin') && !loggedIn.groups?.includes('superAdmin')) {
         throwError("You must be an admin to disable / undisable other users.", 403);
       }
       const { modifiedCount } = await editUser({
          _id,
          disabled
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
