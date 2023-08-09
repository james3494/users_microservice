
const testsFunc = require("./testsFunc.js");
const postUserTests = require("./postUserTests.js");
const deleteUserTests = require("./deleteUserTests.js");
const authTests = require("./authTests.js");
const pingTests = require("./pingTests.js");



describe("Testing user microservice", () => {
    let user = {
        firstName: "Testy",
        lastName: "McTestface",
        email: "test@test.com",
        password: "MyPassword1"
    }

    const setUserId = (_id) => {
        user._id = _id
    }

    // These ping tests check the microservice is online and that the call is rejected if there is an invalid api key
    describe("GET /ping", () => {
        testsFunc({ 
            tests: pingTests, 
            endpoint: "ping", 
            method: "get",
        })
    })

    // create user tests - must stay at the top to have a user to work with for other tests
    describe("POST /user", () => {
        testsFunc({ 
            tests: postUserTests, 
            endpoint: "users", 
            method: "post",
            setUserId,
            user
        })
    })
    // OTHER TESTS GO HERE
// ___________________________________________________________________________________________________________________

    describe("POST /auth", () => {
        testsFunc({ 
            tests: authTests, 
            endpoint: "auth", 
            method: "post",
            user
        })
    })






// ___________________________________________________________________________________________________________________
    // delete user tests - must stay at the bottom to clean up
    describe("DELETE /user", () => {
        testsFunc({ 
            tests: deleteUserTests, 
            method: "delete",
            user
        })
    })

});

