
module.exports = {
  buildDisableUser ({ editUser, catchError, throwError, getUserFromReq }) {
    return async function (httpRequest) {
     try {
       const { ...userInfo } = httpRequest.body;

       const reqFrom = getUserFromReq(httpRequest);
       if (!reqFrom) {
         throwError("You must be logged in to disable a user.", 403);
       }

       if (reqFrom._id !== userInfo._id && !reqFrom.groups.includes('admin')) {
         throwError("You must be an admin to disable other users.", 403);
       }
       const success = await editUser({
          _id: userInfo._id,
          disabled: true
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
