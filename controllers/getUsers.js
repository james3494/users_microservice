
module.exports = {
  buildUserSearch({ filterUsers, throwError }) {
    return async function (httpRequest) {
      const { ...filters } = httpRequest.query;
      const { _id } = httpRequest.params;
      const loggedIn = httpRequest.user;

      let filterObj = {};
      if (_id) {
        filterObj = { _id };
      } else filterObj = filters;

      const foundUsers = await filterUsers(filterObj);

      const loggedInIsAdmin = loggedIn?.admin?.users || loggedIn?.admin?.super;

      let body = foundUsers.map((user) => ({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        photo: user.photo,
        friends: user.friends,
        ...(loggedInIsAdmin || loggedIn?._id === user._id
          ? { groups: user.groups }
          : {}),
        ...(loggedInIsAdmin || loggedIn?._id === user._id
          ? { email: user.email }
          : {}),
        ...(loggedInIsAdmin || loggedIn?._id === user._id
          ? { phone: user.phone }
          : {}),
        ...(loggedInIsAdmin ? { admin: user.admin } : {}),
        ...(loggedInIsAdmin ? { createdOn: user.createdOn } : {}),
        ...(loggedInIsAdmin ? { modifiedOn: user.modifiedOn } : {}),
        ...(loggedInIsAdmin ? { disabled: user.disabled } : {}),
      }));

      if (_id) {
        if (body.length < 1) {
          throwError({
            status: 404,
            title: "User not found with specified id",
            error: "user-not-found",
          });
        }
        body = body[0];
      }

      return {
        headers: { "Content-Type": "application/json" },
        status: 200,
        body,
      };
    };
  },
};
