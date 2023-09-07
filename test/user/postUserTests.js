
const endpoint = "user";
const method = "post";
const data = {
  users: []
}


const testUser = {
  _id: "clm67jm0p000aqire5cuv2i7u",
  firstName: "Testy",
  lastName: "McTestface",
  email: "test@test.com",
  password: "MyPassword1"
}

module.exports = [
  {
    should: "should return an error for an invalid password (too short)",
    endpoint,
    method,
    data,
    send: {
      body: {
        ...testUser,
        password: "short"
      }
    },
    expected: {
      statusCode: 400,
      body: {
        error: "user-invalid-password",
        status: 400,
      },
    },
  },
  {
    should: "should return an error for an invalid password (too long)",
    endpoint,
    method,
    data,
    send: {
      body: {
        ...testUser,
        password: "thisisareallyreallyreallylongpassword"
      }
    },
    expected: {
      statusCode: 400,
      body: {
        error: "user-invalid-password",
        status: 400,
      },
    },
  },
  {
    should: "should return an error for an invalid email",
    endpoint,
    method,
    data,
    send: {
      body: {
        ...testUser,
        email: "justanemail",
      }
    },
    expected: {
      statusCode: 400,
      body: {
        error: "user-invalid-email",
        status: 400,
      },
    },
  },
  {
    should: "should return an error for an invalid firstName (special character)",
    endpoint,
    method,
    data,
    send: {
      body: {
        ...testUser,
        firstName: "Testy*"
      }
    },
    expected: {
      statusCode: 400,
      body: {
        error: "user-invalid-firstName",
        status: 400,
      },
    },
  },
  {
    should: "should return an error for an invalid lastName (too long)",
    endpoint,
    method,
    data,
    send: {
      body: {
        ...testUser,
        lastName: "McTestfacethisisareallyreallylonglastnamesolonginfactithinkitsoverthelimit",
      }
    },
    expected: {
      statusCode: 400,
      body: {
        error: "user-invalid-lastName",
        status: 400,
      },
    },
  },
  {
    should: "should return an error for the user already existing",
    endpoint,
    method,
    data: { users: [ testUser ]},
    send: {
      body: {
        ...testUser,
        _id: null
      }
    },
    expected: {
      statusCode: 400,
      body: {
        error: "user-already-exists",
        status: 400,
      },
    },
  },
  {
    should: "should return a success status and an insertedId",
    endpoint,
    method,
    data,
    send: { body: testUser },
    expected: {
      statusCode: 201,
      body: { insertedId: testUser._id },
    },
  },


];
