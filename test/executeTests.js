const request = require("supertest");
const { app } = require("../server.js");
const expect = require('chai').expect;



module.exports = ({ 
    testData, 
    description, 
    endpoint, 
    method
}) => describe(description, () => {
    const tests = require("./testData.js")[testData];

    tests.forEach((test) => {
        it(test.should, (done) => {
            request(app)
            [method](`${process.env.PATH_ROUTE}/${endpoint}`)
            .send(test.sendBody)
            .set("X-Api-Key", process.env.API_KEY)
            .set("Content-Type", "application/json")
            .end((err, res) => {
                try {
                    expect(res.statusCode).to.be.equal(test.expectedStatus)
                    Object.entries(test.expectedBody || {}).forEach(([key, value]) => {
                        if (value === null || value === "null") expect(res.body[key]).to.be.null
                        else if (value === "notnull") expect(res.body[key]).not.to.be.null
                        else expect(res.body[key]).to.be.equal(value)
                    })
                } catch (err) {
                    // print res.body in the case of a failed response
                    console.log("Response body: ")
                    console.log(res.body)
                    throw err; 
                } finally {
                    if (test.callback) test.callback(res)
                }
                done()
            })
        });
    })
});

