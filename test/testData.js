
// we will create this user, modify it and then delete it.
// tests must be run in order to ensure the user is there. 
// Or at least they must have createUser and deleteUser bookending them
let user = {
  firstName: "Testy",
  lastName: "McTestface",
  email: "test@test.com",
  password: "MyPassword1"
}



const postUsers = [
  {
    expectedStatus: 400,
    expectedBody: {
      error: "user-invalid-password",
      status: 400
    },
    should: "should return an error for an invalid password",
    sendBody: {
      firstName: "Testy",
      lastName: "McTestface",
      email: "test@test.com",
      password: "MyPass"
    }
  },
  {
    expectedStatus: 400,
    expectedBody: {
      error: "user-invalid-email",
      status: 400
    },
    should: "should return an error for an invalid email",
    sendBody: {
      firstName: "Testy",
      lastName: "McTestface",
      email: "justanemail",
      password: "MyPassword1"
    }
  },
  {
    expectedStatus: 400,
    expectedBody: {
      error: "user-invalid-firstName",
      status: 400
    },
    should: "should return an error for an invalid firstName",
    sendBody: {
      firstName: "Testy*",
      lastName: "McTestface",
      email: "test@test.com",
      password: "MyPassword1"
    }
  },
  {
    expectedStatus: 400,
    should: "should return an error for an invalid lastName",
    expectedBody: {
      error: "user-invalid-lastName",
      status: 400
    },
    sendBody: {
      firstName: "Testy",
      lastName: "McTestfacethisisareallyreallylonglastnamesolonginfactithinkitsoverthelimit",
      email: "test@test.com",
      password: "MyPassword1"
    }
  },
  {
    expectedStatus: 201,
    expectedBody: {
      status: 201
    },
    should: "should return a success message and the user should have been created",
    sendBody: user
  },
  {
    expectedStatus: 401,
    should: "should return an error for trying to create a user which already exists",
    expectedBody: {
      error: "user-already-exists",
      status: 401
    },
    sendBody: {
      firstName: "Testy",
      lastName: "McTestface",
      email: "test@test.com",
      password: "MyPassword1"
    }
  }
]



module.exports = {
  postUsers,
  user
}