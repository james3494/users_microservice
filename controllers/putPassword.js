
module.exports = {
  buildResetPassword ({ resetPassword, catchError, throwError, getLoggedIn }) {
    return async function (httpRequest) {
     try {
       const { oldPassword, newPassword } = httpRequest.body;
       const { _id } = httpRequest.params;
       const loggedIn = getLoggedIn(httpRequest);

       if (!loggedIn) {
         throwError("You must be logged in to reset your password.", "user-not-logged-in", 403);
       }
       if (loggedIn._id !== _id) {
         throwError("You cannot reset the password of another user.", "user-not-found", 404, "Trying to reset the password of a different user to the one logged in");
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
