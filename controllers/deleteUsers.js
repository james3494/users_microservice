
module.exports = {
    buildDeleteUser ({ removeUser, throwError }) {
        return async function (httpRequest) {
            const { _id } = httpRequest.params;

            if (!httpRequest.user?.admin?.super) {
                throwError({
                    title: "You must be a superadmin to delete users.", 
                    error: "user-insufficient-admin-rights", 
                    status: 403
                });
            }
            const { deletedId } = await removeUser({ _id });
        
            return {
                headers: { "Content-Type": "application/json" },
                status: 200,
                body: { deletedId }
            };
        };
    }
};
  