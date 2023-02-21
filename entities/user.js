/* TODO
set refresh time for jwt token
edit users endpoint - seperate endpoint for make admin, disable etc?
make sure correct Post, get, put delete etc
*/

module.exports = {
  buildMakeUser ({ Id, hashMachine, throwError, isValidEmail, isValidName }) {
    return function ({
      email,
      firstName,
      lastName,
      createdOn = Date.now(),
      _id = Id.makeId(),
      modifiedOn = Date.now(),
      salt = hashMachine.genSalt(),
      hash = hashMachine.hash(hashMachine.getDefaultPassword(), salt),
      groups = [],
      friends = [],
      lastLogin = null,
      disabled = false,
    } = {}) {

      if (!Id.isValidId(_id)) {
       throwError('User must have a valid id.', 400);
      }
      if (!isValidEmail(email)) {
       throwError('User must have a valid email.', 400);
      }
      if (isValidName(lastName)) {
       throwError('User must have a valid lastName.', 400);
      }
      if (isValidName(firstName)) {
       throwError('User must have a valid firstName.', 400);
      }
      if (!hashMachine.isValidHash(hash)) {
       throwError('User must have a valid hash.', 400);
      }
      if (!hashMachine.isValidSalt(salt)) {
       throwError('User must have a valid salt.', 400);
      }
      if (typeof disabled !== 'boolean') {
        throwError('Disabled must be a boolean.', 400);
      }
      if (typeof modifiedOn !== 'number' || modifiedOn > Date.now()) {
        throwError('modifiedOn must be a number and in the past.', 400);
      }
      if (typeof createdOn !== 'number' || createdOn > Date.now()) {
        throwError('createdOn must be a number and in the past.', 400);
      }
      if ((lastLogin !== null) && (typeof lastLogin !== 'number' || lastLogin > Date.now())) {
        throwError('lastLogin must be null or a number and in the past.', 400);
      }
      // groups check
      if (typeof groups !== 'object' || !Array.isArray(groups)) {
       throwError('User groups must be an array.', 400);
      }
      if ((new Set(groups)).size !== groups.length) {
       throwError('User must not have repeated groups.', 400);
      }
      const allowedGroups = ['admin', 'superAdmin'];
      if (!groups.every(group => allowedGroups.includes(group))) {
       throwError('All user groups must be one of [' + allowedGroups.reduce((string, group) => string + ' ' + group) + ']', 400);
      }
      if (groups.includes('superAdmin') && !groups.includes('admin')) {
       throwError('All superAdmins must also be admins.', 400);
      }

      // friends check
      if (typeof friends !== 'object' || !Array.isArray(friends)) {
       throwError('User friends must be an array.', 400);
      }
      if ((new Set(friends)).size !== friends.length) {
       throwError('User must not have repeated friends.', 400);
      }
      if (!friends.every(friend => Id.isValidId(friend))) {
       throwError('All user friends must have a valid ID.', 400);
      }

      return Object.freeze({
        getFirstName: () => firstName,
        getLastName: () => lastName,
        getEmail: () => email,
        getCreatedOn: () => createdOn,
        getId: () => _id,
        getModifiedOn: () => modifiedOn,
        getLastLogin: () => lastLogin,
        getHash: () => hash,
        getSalt: () => salt,
        getGroups: () => groups,
        getFriends: () => friends,
        isDisabled: () => disabled,
        resetPassword: (password) => {
         if(!hashMachine.isValidPassword(password)) {
           throwError('Please choose a valid password.', 400);
         }
         hash = hashMachine.hash(password, salt);
        },
        isCorrectPassword: (password) => {
         return hashMachine.hash(password, salt) == hash;
        },
        // the following is what will be inserted into the database. should match the inputs for this entity
        getAll: () => ({
         firstName,
         lastName,
         email,
         createdOn,
         _id,
         modifiedOn,
         groups,
         lastLogin,
         disabled,
         friends,
         hash,
         salt
        }),
      });
    }
  }
};
