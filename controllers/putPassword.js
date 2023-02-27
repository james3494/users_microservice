
module.exports = {
  buildResetPassword ({ resetPassword, catchError, throwError, getLoggedIn }) {
    return async function (httpRequest) {
     try {
       const { oldPassword, newPassword } = httpRequest.body;
       const { _id } = httpRequest.params;
       const loggedIn = getLoggedIn(httpRequest);

       if (!loggedIn) {
         throwError("You must be logged in to reset your password.", 403);
       }
       if (loggedIn._id !== _id) {
         throwError("You cannot reset the password of another user.", 403);
       }

       const { modifiedCount } = await resetPassword({
          _id,
          oldPassword,
          newPassword
        });

       return {
         headers: { 'Content-Type': 'application/json' },
         statusCode: 201,
         body: { modifiedCount }
       };
     } catch (e) {
       return catchError(e);
     }
    };
  }
};
