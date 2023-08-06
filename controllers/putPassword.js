
module.exports = {
  buildResetPassword ({ resetPassword, throwError, getLoggedIn }) {
    return async function (httpRequest) {
      const { oldPassword, newPassword } = httpRequest.body;
      const { _id } = httpRequest.params;
      const loggedIn = getLoggedIn(httpRequest);

      if (!loggedIn) {
        throwError({
          title: "You must be logged in to reset your password.", 
          error: "user-not-logged-in", 
          status: 403
        });
      }
      if (loggedIn._id !== _id) {
        throwError({
          title: "You cannot reset the password of another user.", 
          error: "user-not-found", 
          status: 404, 
          detail: "Trying to reset the password of a different user to the one logged in"
        });
      }

      const { modifiedCount } = await resetPassword({
        _id,
        oldPassword,
        newPassword
      });

      return {
        headers: { 'Content-Type': 'application/json' },
        status: 201,
        body: { modifiedCount }
      };
    };
  }
};
