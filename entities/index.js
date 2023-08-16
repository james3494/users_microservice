const { Id } = require("./Id");
const { hashMachine } = require("./hashMachine");
const { buildMakeUser } = require("./user");
const throwError = require("errorHandling").buildThrowError({
  logErrors: process.env.LOG_ERRORS,
});
const { buildUserValidation } = require("./validation");

const makeUser = buildMakeUser({
  Id,
  hashMachine,
  throwError,
  validation: buildUserValidation({ Id, hashMachine }),
});

module.exports = { makeUser };
