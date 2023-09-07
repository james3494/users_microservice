
const executeTests = require("../executeTests.js");

const postUserTests = require("./postUserTests.js");
const deleteUserTests = require("./deleteUserTests.js");
const authTests = require("./authTests.js");
const getUserTests = require("./getUserTests.js");


module.exports = () => {
    describe("POST /user", () => executeTests(postUserTests));
    describe("GET /user", () => executeTests(getUserTests));
    describe("DELETE /user", () => executeTests(deleteUserTests));
    describe("POST /auth", () => executeTests(authTests));
}
