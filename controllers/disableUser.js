
module.exports = {
  buildDisableUser ({ editUser, catchError, throwError, getLoggedIn }) {
    return async function (httpRequest) {
     try {
       const { _id } = httpRequest.params;

       const reqFrom = getLoggedIn(httpRequest);
       if (!reqFrom) {
         throwError("You must be logged in to disable a user.", 403);
       }

       if (reqFrom._id !== _id && !reqFrom.groups.includes('admin')) {
         throwError("You must be an admin to disable other users.", 403);
       }
       await editUser({
          _id,
          disabled: true
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
