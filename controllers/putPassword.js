
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
