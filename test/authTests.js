const endpoint = 'auth'

const authTests = [
    (user) => ({
      expectedStatus: 400,
      endpoint,
      expectedBody: {
        error: "user-invalid-password",
        status: 400
      },
      should: "should return an error for an invalid password",
      sendBody: {
        email: user.email
      },
    }),
    (user) => ({
      expectedStatus: 400,
      endpoint,
      expectedBody: {
        error: "user-invalid-email",
        status: 400
      },
      should: "should return an error for an invalid email",
      sendBody: {
        password: user.password,
      },
    }),
    (user) => ({
      expectedStatus: 404,
      endpoint,
      expectedBody: {
        error: "user-not-found",
        status: 404
      },
      should: "should return an error for user not found",
      sendBody: {
        password: user.password,
        email: "thisemail@doesntexist.com"
      },
    }),
    (user) => ({
      expectedStatus: 401,
      endpoint,
      expectedBody: {
        error: "auth-incorrect-credentials",
        status: 401
      },
      should: "should return an error for incorrect credentials",
      sendBody: {
        password: "wrongpassword",
        email: user.email
      },
    }),
    // how do we make the user disabled first?
    // (user) => ({
    //   expectedStatus: 403,
    // endpoint,
    // expectedBody: {
    //     error: "user-is-disabled",
    //     status: 403
    //   },
    //   should: "should return an error for the user being disabled",
    //   sendBody: {
    //     password: user.password,
    //     email: user.email
    //   },
    // }),
    (user) => ({
      expectedStatus: 200,
      endpoint,
      expectedBody: {
        _id: user._id,
        groups: "notnull",
        friends: "notnull",
        admin: "notnull"
      },
      should: "should return a successful status and fields to do with the user which will affect future authorization",
      sendBody: {
        password: user.password,
        email: user.email
      },
    }),
  ]
  

  
  module.exports = authTests