
const data = require("../data/1.js");
const loggedInUser = {
    _id: "clm256k9w00003g5xafvyw4ld", // stub
    admin: {
        super: true 
    }
};
const method = "delete";



module.exports = [
    {
        should: "should return an error about insufficient admin permissions",
        data,
        endpoint: `user/${data.users[0]._id}`,
        method,
        send: {
            loggedInUser: {
                ...loggedInUser, admin: {} 
            } 
        },
        expect: {
            statusCode: 403,
            body: {
                status: 403,
                error: "user-insufficient-admin-rights"
            }
        }
    },
    {
        should: "should return a deletedId",
        data,
        endpoint: `user/${data.users[0]._id}`,
        method,
        send: {
            loggedInUser 
        },
        expect: {
            statusCode: 200,
            body: {
                deletedId: data.users[0]._id 
            }
        }
    },
    {
        should: "should return a 404 as the user is not in the data",
        data,
        endpoint: "user/thisidisnotinthedata",
        method,
        send: {
            loggedInUser 
        },
        expect: {
            statusCode: 404,
            body: { 
                error: "user-not-found",
                status: 404
            }
        }
    }
];


