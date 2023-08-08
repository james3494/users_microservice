
module.exports = {
    buildDeleteUser ({ removeUser, getLoggedIn, throwError }) {
      return async function (httpRequest) {
        const { _id } = httpRequest.params;
        const loggedIn = getLoggedIn(httpRequest);

        if (!loggedIn.admin?.super) {
          throwError({
            title: "You must be a superadmin to delete users.", 
            error: "user-insufficient-admin-rights", 
            status: 403
          });
        }
        const { deletedId } = await removeUser({ _id });
        
        return {
          headers: { 'Content-Type': 'application/json' },
          status: 200,
          body: { deletedId }
        };
      };
    }
  };
  