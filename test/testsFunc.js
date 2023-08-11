const request = require("supertest");
const { app } = require("../server.js");
const expect = require('chai').expect;

const testsFunc = ({ tests, method, setUserId, user }) => {
    tests.forEach((test) => {
        // this is a hack - need should now but need to initialise test inside it to get updated user
        let should = test({}).should;
        it(should, (done) => {
            test = test(user || {})
            request(app)
            [method](`${process.env.PATH_ROUTE}/${test.endpoint}`)
            .send(test.sendBody)
            .query(test.query)
            .set(test.apiKeyOverride === null ? "X-Other" : "X-Api-Key", test.apiKeyOverride || process.env.API_KEY)
            .set("X-Current-User", JSON.stringify(test.loggedInUser || null))
            .set("Content-Type", "application/json")
            .end((error, res) => {

                try {
                    expect(res.statusCode).to.be.equal(test.expectedStatus)
                    if (typeof test.expectedBody === 'function') {
                        test.expectedBody(res.body)
                    } else {
                        Object.entries(test.expectedBody || {}).forEach(([key, value]) => {
                            if (value === null || value === "null") expect(res.body[key]).to.be.null
                            else if (value === "notnull") expect(res.body[key]).not.to.be.null
                            else expect(res.body[key]).to.be.equal(value)
                        })
                    }
                } catch (err) {
                    // print res.body in the case of a failed response
                    console.log("Response body: ")
                    console.log(res ? res.body : "no response body")
                    throw err
                } finally {
                    if (res?.body?.insertedId && setUserId) setUserId(res.body.insertedId)
                }

                done()
            })
        });
    })
}

module.exports = testsFunc
