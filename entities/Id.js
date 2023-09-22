const cuid = require('@paralleldrive/cuid2');

const Id = Object.freeze({
  makeId: cuid,
  isValidId: cuid.isCuid
});

module.exports = { Id };
