
module.exports = {
  buildResetPassword ({ resetPassword, catchError, getLoggedIn, throwError }) {
    return async function (httpRequest) {
     try {
       const { oldPassword, newPassword } = httpRequest.body;
       const { _id } = httpRequest.params;
       const reqFrom = getLoggedIn(httpRequest);
       if (!reqFrom) {
         throwError("You must be logged in to reset your password.", 403);
       }
       if (reqFrom._id !== _id) {
         throwError("You cannot reset the password of another user.", 403);
       }

       await resetPassword({
          _id,
          oldPassword,
          newPassword
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
