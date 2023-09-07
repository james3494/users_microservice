const executeTests = require("../executeTests.js");
const pingTests = require("./pingTests.js");

  // These ping tests check the microservice is online and that the call is rejected if there is an invalid api key

module.exports = () => {
  describe("GET /ping", () => executeTests(pingTests));
};
