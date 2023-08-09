
const deleteUsers = [
    (user) => ({
      expectedStatus: 403,
      endpoint: `users/${user._id}`,
      expectedBody: {
        status: 403,
        error: "user-insufficient-admin-rights"
      },
      should: "should return an error about insufficient admin permissions",
      sendBody: {
        _id: user._id
      },
      loggedInUser: {
        _id: user._id,
        admin: { super: false }
      }
    }),
    (user) => ({
      expectedStatus: 200,
      endpoint: `users/${user._id}`,
      expectedBody: {
        deletedId: "notnull"
      },
      should: "should return a deletedId and a successful status",
      sendBody: {
        _id: user._id
      },
      loggedInUser: {
        _id: user._id,
        admin: { super: true }
      }
    }),
    (user) => ({
      expectedStatus: 404,
      endpoint: `users/${user._id}`,
      should: "should return a 404 as the user has already been deleted and can't be found",
      expectedBody: {
        error: "user-not-found",
        status: 404
      },
      sendBody: {
        _id: user._id
      },
      loggedInUser: {
        _id: user._id,
        admin: { super: true }
      }
    }),
  ]


  module.exports = deleteUsers