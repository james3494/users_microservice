
const request = require('supertest');
const { app } = require('../server');

const userTests = () => {
  describe("testing the test", function() {
    it("it should has status code 200", function(done) {
      done();
    });
  });
};


module.exports = { userTests };
