const data = require(`../data/2.js`);
const password = "MyPassword1";
const email = data.users[0].email;

const method = "post";
const endpoint = "auth";

module.exports = [
  {
    should: "should return an error for an invalid password",
    method,
    data,
    endpoint,
    send: {
      body: { email },
    },
    expect: {
      statusCode: 400,
      body: {
        status: 400,
        error: "user-invalid-password",
      },
    },
  },
  {
    should: "should return an error for an invalid email",
    method,
    data,
    endpoint,
    send: {
      body: { password },
    },
    expect: {
      statusCode: 400,
      body: {
        status: 400,
        error: "user-invalid-email",
      },
    },
  },
  {
    should: "should return an error for user not found",
    method,
    data,
    endpoint,
    send: {
      body: { email: "thisemail@doesntexist.com", password },
    },
    expect: {
      statusCode: 404,
      body: {
        status: 404,
        error: "user-not-found",
      },
    },
  },
  {
    should: "should return an error for incorrect credentials",
    method,
    data,
    endpoint,
    send: {
      body: { email, password: "wrongpass" },
    },
    expect: {
      statusCode: 401,
      body: {
        status: 401,
        error: "auth-incorrect-credentials",
      },
    },
  },
  {
    should: "should return an error as the user is disabled",
    method,
    data,
    endpoint,
    send: {
      body: { email: "test5@test.com", password },
    },
    expect: {
      statusCode: 403,
      body: {
        status: 403,
        error: "user-is-disabled",
      },
    },
  },
  {
    should:
      "should return a successful status and fields to do with the user which will affect future authorization",
    method,
    data,
    endpoint,
    send: {
      body: { email, password },
    },
    expect: {
      statusCode: 200,
      body: {
        _id: data.users[0]._id,
        groups: data.users[0].groups,
        friends: data.users[0].friends,
        admin: data.users[0].admin,
      },
    },
  },
];
