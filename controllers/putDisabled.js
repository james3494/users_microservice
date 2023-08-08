
module.exports = {
  buildDisableUser ({ editUser, throwError, getLoggedIn }) {
    return async function (httpRequest) {
      const { _id } = httpRequest.params;
      const { disabled } = httpRequest.body;
      const loggedIn = getLoggedIn(httpRequest);

      if (!loggedIn) {
        throwError({
          title: "You must be logged in to disable / undisable a user.", 
          error: "user-not-logged-in", 
          status: 403
        });
      }

      if (loggedIn._id !== _id && !loggedIn.admin?.users && !loggedIn.admin?.super) {
        throwError({
          title: "You must be an admin to disable / undisable other users.", 
          error: "user-insufficient-admin-rights", 
          status: 403
        });
      }
      const { modifiedCount } = await editUser({
        _id,
        disabled
      });

      return {
        headers: { 'Content-Type': 'application/json' },
        status: 201
      };
    };
  }
};
