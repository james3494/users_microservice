// todo - resend the jwt token because the payload may have changed

module.exports = {
  buildEditUser ({ editUser, catchError, throwError, getUserFromReq }) {
    return async function (httpRequest) {
     try {
       const { _id, firstName, lastName } = httpRequest.body;

       const reqFrom = getUserFromReq(httpRequest);
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
