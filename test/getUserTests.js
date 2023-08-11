const expect = require('chai').expect;

const ourUserInArray = (user, array) => {
    const element = array.find(el => el._id == user._id);
    expect(element).to.not.be.an('undefined')
}

const ourUserNotInArray = (user, array) => {
    const element = array.find(el => el._id == user._id);
    expect(element).to.be.an('undefined')
}


const getUsers = [
    (user) => ({
      expectedStatus: 200,
      endpoint: `users/${user._id}`,
      expectedBody: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName
      },
      should: "should return an object of the one user we have created",
    }),
    (user) => ({
      expectedStatus: 200,
      endpoint: `users`,
      expectedBody: (resBody) => ourUserInArray(user, resBody),
      should: "should return an array which contains our created user (querying section of firstName)",
      query: {
        firstName: user?.firstName?.substring(0, 4)
      }
    }),
    (user) => ({
      expectedStatus: 200,
      endpoint: `users`,
      expectedBody: (resBody) => ourUserInArray(user, resBody),
      should: "should return an array which contains our created user (querying section of lastName)",
      query: {
        lastName: user?.lastName?.substring(3, user.lastName?.length)
      }
    }),
    (user) => ({
      expectedStatus: 200,
      endpoint: `users`,
      expectedBody: (resBody) => ourUserInArray(user, resBody),
      should: "should return an array which contains our created user (querying section of firstName and lastName)",
      query: {
        firstName: user?.firstName?.substring(0, 4),
        lastName: user?.lastName?.substring(3, user.lastName?.length)

      }
    }),
    (user) => ({
      expectedStatus: 200,
      endpoint: `users`,
      expectedBody: (resBody) => ourUserNotInArray(user, resBody),
      should: "should return an array which does NOT contain our created user (querying wrong firstName)",
      query: {
        firstName: user.firstName + 'a'
      }
    }),
    (user) => ({
      expectedStatus: 200,
      endpoint: `users`,
      expectedBody: (resBody) => ourUserNotInArray(user, resBody),
      should: "should return an array which does NOT contain our created user (querying firstName with wrong lastName)",
      query: {
        firstName: user.firstName,
        lastName: user.lastName + 'a',
      }
    }),
    
  ]


  module.exports = getUsers