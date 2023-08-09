
const testsFunc = require("./testsFunc.js");
const postUserTests = require("./postUserTests.js");
const deleteUserTests = require("./deleteUserTests.js");



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

    // write test to check if it fails when wrong api key sent / no api key

    // create user tests - must stay at the top to have a user
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



    describe('Testing GET request', function () {
        console.log("outside it: " + user)
        it('should return status 200', function () {
            console.log("inside it: " + user)
        });
    });






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

