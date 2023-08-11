const endpoint = 'users'

const postUsers = [
    (user) => ({
      expectedStatus: 400,
      endpoint,
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
      endpoint,
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
      endpoint,
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
      endpoint,
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
      endpoint,
      expectedBody: {
        insertedId: "notnull"
      },
      should: "should return an insertedId and a successful status. The user should have been created",
      sendBody: user,
    }),
    (user) => ({
      expectedStatus: 401,
      should: "should return an error for trying to create a user which already exists",
      endpoint,
      expectedBody: {
        error: "user-already-exists",
        status: 401
      },
      sendBody: user
    })
  ]
  

  
  module.exports = postUsers