
module.exports = {
  buildResetPassword ({ resetPassword, catchError, getUserFromReq, throwError }) {
    return async function (httpRequest) {
     try {
       const reqFrom = getUserFromReq(httpRequest);
       if (!reqFrom) {
         throwError("You must be logged in to reset your password.", 403);
       }
       if (reqFrom._id !== userInfo._id) {
         throwError("You cannot reset the password of another user.", 403);
       }

       const { _id, oldPassword, newPassword } = httpRequest.body;
       const success = await resetPassword({
          _id,
          oldPassword,
          newPassword
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
