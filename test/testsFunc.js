const request = require("supertest");
const { app } = require("../server.js");
const expect = require('chai').expect;

const testsFunc = ({ tests, endpoint, method, setUserId, user }) => {
    tests.forEach((test) => {
        let should = test({}).should;
        it(should, (done) => {
            test = test(user)
            request(app)
            [method](`${process.env.PATH_ROUTE}/${test.endpoint || endpoint}`)
            .send(test.sendBody)
            .set("X-Api-Key", process.env.API_KEY)
            .set("X-Current-User", JSON.stringify(test.loggedInUser || null))
            .set("Content-Type", "application/json")
            .end((error, res) => {

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
                    console.log(res ? res.body : "no response body")
                    throw err
                } finally {
                    if (res.body.insertedId && setUserId) setUserId(res.body.insertedId)
                }

                done()
            })
        });
    })
}

module.exports = testsFunc
