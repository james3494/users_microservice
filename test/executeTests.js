import request from "supertest";
import { app } from "../server.js";
import populateDb from "./populateDb.js";

import deepEqualInAnyOrder from "deep-equal-in-any-order";
import chai from "chai";
chai.use(deepEqualInAnyOrder);
const { expect } = chai;


// test body can be an object or a function returning true (for pass) or false (for fail)
const checkBody = (testBody, resBody) => {
    if (typeof testBody === "function") {
        expect(testBody(resBody)).to.be.equal(true);
    } else {
        Object.entries(testBody || {}).forEach(([ key, value ]) => {
            if (typeof value === "object") {
                expect(resBody[key]).to.deep.equalInAnyOrder(value);
            } else {
                expect(resBody[key]).to.be.equal(value);
            }
        });
    }
};

const executeTest = (test) => {
    test.send = test.send || {};
    test.expect = test.expect || {};

    it(test.should, (done) => {
        populateDb(test.data).then(() => {
            request(app)
                [test.method](`${process.env.PATH_ROUTE}/${test.endpoint}`)
                .send(test.send.body)
                .query(test.send.query)
                .set(
                    "X-Api-Key",
                    test.send.apiKey === undefined
                        ? process.env.API_KEY
                        : test.send.apiKey
                )
                .set("X-Current-User", JSON.stringify(test.send.loggedInUser || null))
                .set("Content-Type", "application/json")
                .end((error, res) => {
                    try {
                        if (test.expect.statusCode) {
                            expect(res.statusCode).to.be.equal(test.expect.statusCode);
                        }
                        if (test.expect.body) {
                            checkBody(test.expect.body, res.body);
                        }
                    } catch (err) {
                        // print res.body in the case of a failed response
                        console.log("Response body: ");
                        console.log(res ? res.body : "no response body");
                        throw err;
                    }
                    done();
                })
            ;
        });
    }).timeout(2000);
};

export default (tests) => {
    tests.forEach((test) => executeTest(test));
};
