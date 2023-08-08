// ut something in here to ensure admin changes can't be passed this way, by passing putAdmin
module.exports = {
  buildEditUser ({ editUser, throwError, getLoggedIn }) {
    return async function (httpRequest) {
      const { firstName, lastName } = httpRequest.body;
      const { _id } = httpRequest.params;
      const loggedIn = getLoggedIn(httpRequest);

      if (!loggedIn) {
        throwError({
          title: "You must be logged in to edit your user.", 
          error: "user-not-logged-in", 
          status: 403
        });
      }
      if (loggedIn._id !== _id && !loggedIn.admin?.users && !loggedIn.admin?.super) {
        throwError({
          title: "You must be an admin to edit other users.", 
          error: "user-insufficient-admin-rights", 
          status: 403
        });
      }
      // at the moment only fields to edit are firstname and lastname
      const { modifiedCount } = await editUser({
        _id,
        ...(firstName ? { firstName } : {}),
        ...(lastName ? { lastName } : {}),
      });

      return {
        headers: { 'Content-Type': 'application/json' },
        status: 201,
        body: { modifiedCount, success: true }
      };
    };
  }
};
