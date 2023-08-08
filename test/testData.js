
// we will create this user, modify it and then delete it.
// tests must be run in order to ensure the user is there. 
// Or at least they must have createUser and deleteUser bookending them
let user = {
  firstName: "Testy",
  lastName: "McTestface",
  email: "test@test.com",
  password: "MyPassword1"
}

const updateUser = (fieldsToUpdate) => {
  user = { ...user, ...fieldsToUpdate }
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
      ...user,
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
      ...user,
      email: "justanemail",
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
      ...user,
      firstName: "Testy*"
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
      ...user, 
      lastName: "McTestfacethisisareallyreallylonglastnamesolonginfactithinkitsoverthelimit",
    }
  },
  {
    expectedStatus: 201,
    expectedBody: {
      insertedId: "notnull"
    },
    should: "should return an insertedId and a successful status. The user should have been created",
    sendBody: user,
    callback: (res) => updateUser({ _id: res.body.insertedId })
  },
  {
    expectedStatus: 401,
    should: "should return an error for trying to create a user which already exists",
    expectedBody: {
      error: "user-already-exists",
      status: 401
    },
    sendBody: user
  }
]






const deleteUsers = [
  // include one without being logged in, and one without sufficient admin permissions
  {
    expectedStatus: 200,
    expectedBody: {
      deletedId: "notnull"
    },
    should: "should return a deletedId and a successful status",
    sendBody: {
      _id: user._id
    }
  },
  {
    expectedStatus: 404,
    should: "should return a 404 as the user has already been deleted and can't be found",
    expectedBody: {
      error: "user-not-found",
      status: 404
    },
    sendBody: {
      _id: user._id
    }
  },
]


module.exports = {
  postUsers,
  deleteUsers
}