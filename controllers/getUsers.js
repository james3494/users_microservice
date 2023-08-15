// TODO: choose which fields to return - does it depend on whos logged in?
// three tiers: for someone else, your own user, and an admin looking at details of user

module.exports = {
  buildUserSearch({ filterUsers, throwError, getLoggedIn }) {
    return async function (httpRequest) {
      const { ...filters } = httpRequest.query;
      const { _id } = httpRequest.params;

      let filterObj = {};
      if (_id) {
        filterObj = { _id }
      } else filterObj = filters;

      const filtered = await filterUsers(filterObj);
      let body = filtered.map(user => ({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        groups: user.groups,
        friends: user.friends,
        email: user.email,
      }))

      if (_id) {
        if (body.length < 0) {
          throwError({
            status: 404,
            title: "User not found with specified id",
            error: "user-not-found"
          })
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
