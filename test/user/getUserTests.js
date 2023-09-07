const returnFields = ({
  _id,
  firstName,
  lastName,
  friends,
  subscription,
  photo
}) => ({
  _id,
  firstName,
  lastName,
  friends,
  subscription,
  photo
});

const data = require(`../data/1.js`);
const method = "get";
const endpoint = "user";

module.exports = [
  {
    should: "should return an object corresponding to the user requested",
    method,
    data,
    endpoint: `${endpoint}/${data.users[0]._id}`,
    expect: {
      statusCode: 200,
      body: returnFields(data.users[0]),
    },
  },
  {
    should: "Querying firstname",
    method,
    data,
    endpoint,
    send: {
      query: { firstName: "Test" },
    },
    expect: {
      statusCode: 200,
      body: [returnFields(data.users[0])],
    },
  },
  {
    should: "Querying lastname",
    method,
    data,
    endpoint,
    send: {
      query: { lastName: "face" },
    },
    expect: {
      statusCode: 200,
      body: [returnFields(data.users[0]), returnFields(data.users[1])],
    },
  },
  {
    should: "Querying disabled",
    method,
    data,
    endpoint,
    send: {
      query: { disabled: true },
    },
    expect: {
      statusCode: 200,
      body: [returnFields(data.users[4]), returnFields(data.users[4])],
    },
  },
  {
    should: "Querying _ids",
    method,
    data,
    endpoint,
    send: {
      query: { _id: [ data.users[2]._id, data.users[3]._id ] },
    },
    expect: {
      statusCode: 200,
      body: [
        returnFields(data.users[2]),
        returnFields(data.users[3]),
      ],
    },
  },
  {
    should: "Querying firstName and lastName",
    method,
    data,
    endpoint,
    send: {
      query: { firstName: "Bob", lastName: "face" },
    },
    expect: {
      statusCode: 200,
      body: [returnFields(data.users[1])],
    },
  },
];
