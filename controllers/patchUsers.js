module.exports = {
  buildEditUser({ editUser, throwError }) {
    return async function (httpRequest) {
      const { firstName, lastName, email, phone, photo, admin } =
        httpRequest.body;
      const { _id } = httpRequest.params;
      const loggedIn = httpRequest.user;

      if (!loggedIn) {
        throwError({
          title: "You must be logged in to edit your user.",
          error: "user-not-logged-in",
          status: 403,
        });
      }
      if (
        loggedIn._id !== _id &&
        !loggedIn.admin?.users &&
        !loggedIn.admin?.super
      ) {
        throwError({
          title: "You must be an admin to edit other users.",
          error: "user-insufficient-admin-rights",
          status: 403,
        });
      }
      if (admin && !loggedIn.admin.super) {
        throwError({
          title: "You must be a super admin to edit admin rights of a user.",
          error: "user-insufficient-admin-rights",
          status: 403,
        });
      }

      const { modifiedCount } = await editUser({
        _id,
        ...(firstName ? { firstName } : {}),
        ...(lastName ? { lastName } : {}),
        ...(email ? { email } : {}),
        ...(phone ? { phone } : {}),
        ...(photo ? { photo } : {}),
        ...(admin ? { admin } : {}),
      });

      return {
        headers: { "Content-Type": "application/json" },
        status: 201,
        body: { modifiedCount, success: true },
      };
    };
  },
};
