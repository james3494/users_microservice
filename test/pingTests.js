
const pingTests = [
    (user) => ({
        expectedStatus: 403,
        expectedBody: {
            error: "user-microservice-invalid-api-key",
            status: 403
          },
        should: "should return an error because no api key is used",
        apiKeyOverride: null,
    }),
    (user) => ({
        expectedStatus: 403,
        expectedBody: {
            error: "user-microservice-invalid-api-key",
            status: 403
          },
        should: "should return an error because the wrong api key is used",
        apiKeyOverride: "thewrongapikey",
    }),
    (user) => ({
        expectedStatus: 200,
        should: "should return a success status because the api is online",
    }),
]




module.exports = pingTests