
module.exports = {
  buildEditUser ({ editUser, catchError, throwError, getLoggedIn }) {
    return async function (httpRequest) {
     try {
       const { firstName, lastName } = httpRequest.body;
       const { _id } = httpRequest.params;

       const reqFrom = getLoggedIn(httpRequest);
       if (!reqFrom) {
         throwError("You must be logged in to edit your user.", 403);
       }
       if (reqFrom._id !== _id && !reqFrom.groups.includes('admin')) {
         throwError("You must be an admin to edit other users.", 403);
       }
       // at the moment only fields to edit are firstname and lastname
       const success = await editUser({
         _id,
         ...(firstName ? { firstName } : {}),
         ...(lastName ? { lastName } : {}),
       });

       return {
         headers: { 'Content-Type': 'application/json' },
         statusCode: 201,
         body: { ...success }
       };
     } catch (e) {
       return catchError(e);
     }
    };
  }
};
