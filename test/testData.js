
const postUsers = [
  (user) => ({
    expectedStatus: 400,
    expectedBody: {
      error: "user-invalid-password",
      status: 400
    },
    should: "should return an error for an invalid password",
    sendBody: {
      ...user,
      password: "MyPass"
    }
  }),
  (user) => ({
    expectedStatus: 400,
    expectedBody: {
      error: "user-invalid-email",
      status: 400
    },
    should: "should return an error for an invalid email",
    sendBody: {
      ...user,
      email: "justanemail",
    }
  }),
  (user) => ({
    expectedStatus: 400,
    expectedBody: {
      error: "user-invalid-firstName",
      status: 400
    },
    should: "should return an error for an invalid firstName",
    sendBody: {
      ...user,
      firstName: "Testy*"
    }
  }),
  (user) => ({
    expectedStatus: 400,
    should: "should return an error for an invalid lastName",
    expectedBody: {
      error: "user-invalid-lastName",
      status: 400
    },
    sendBody: { 
      ...user, 
      lastName: "McTestfacethisisareallyreallylonglastnamesolonginfactithinkitsoverthelimit",
    }
  }),
  (user) => ({
    expectedStatus: 201,
    expectedBody: {
      insertedId: "notnull"
    },
    should: "should return an insertedId and a successful status. The user should have been created",
    sendBody: user,
  }),
  (user) => ({
    expectedStatus: 401,
    should: "should return an error for trying to create a user which already exists",
    expectedBody: {
      error: "user-already-exists",
      status: 401
    },
    sendBody: user
  })
]






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


module.exports =  {
  postUsers,
  deleteUsers,
}

