
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
      if (loggedIn._id !== _id && !loggedIn.admin?.users && !loggedIn.admin?.super) {
        throwError({
          title: "You must be an admin to reset the password of other users.", 
          error: "user-insufficient-admin-rights", 
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
        body: { modified: modifiedCount >= 1 },
      };
    };
  }
};
