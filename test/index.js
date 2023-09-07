
const doUserTests = require("./user");
const doPingTests = require("./ping");

describe("Testing user microservice", () => {

  doPingTests();
  doUserTests();
});
