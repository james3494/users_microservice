

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
      disabled = false,
    } = {}) {

      if (!Id.isValidId(_id)) {
       throwError('User must have a valid id.', "user-invalid-id", 400);
      }
      if (!isValidEmail(email)) {
       throwError('User must have a valid email.', "user-invalid-email", 400);
      }
      if (!isValidName(lastName)) {
       throwError('User must have a valid lastName.', "user-invalid-lastName", 400);
      }
      if (!isValidName(firstName)) {
       throwError('User must have a valid firstName.', "user-invalid-firstName", 400);
      }
      if (!hashMachine.isValidHash(hash)) {
       throwError('User must have a valid hash.', "user-invalid-hash", 400);
      }
      if (!hashMachine.isValidSalt(salt)) {
       throwError('User must have a valid salt.', "user-invalid-salt", 400);
      }
      if (typeof disabled !== 'boolean') {
        throwError('Disabled must be a boolean.', "user-invalid-disabled", 400);
      }
      if (typeof modifiedOn !== 'number' || modifiedOn > Date.now()) {
        throwError('modifiedOn must be a number and in the past.', "user-invalid-modifiedOn", 400);
      }
      if (typeof createdOn !== 'number' || createdOn > Date.now()) {
        throwError('createdOn must be a number and in the past.', "user-invalid-createdOn", 400);
      }
      // groups check
      if (typeof groups !== 'object' || !Array.isArray(groups)) {
       throwError('User groups must be an array.', "user-invalid-groups", 400);
      }
      if ((new Set(groups)).size !== groups.length) {
       throwError('User must not have repeated groups.', "user-invalid-groups", 400);
      }
      const allowedGroups = ['usersAdmin', 'huntedAdmin', 'superAdmin'];
        if (!groups.every(group => allowedGroups.includes(group))) {
       throwError('All user groups must be one of [' + allowedGroups.reduce((string, group) => string + ' ' + group) + ']', "user-invalid-groups", 400);
      }


      // friends check
      if (typeof friends !== 'object' || !Array.isArray(friends)) {
       throwError('User friends must be an array.', "user-invalid-friends", 400);
      }
      if ((new Set(friends)).size !== friends.length) {
       throwError('User must not have repeated friends.', "user-invalid-friends", 400);
      }
      if (!friends.every(friend => Id.isValidId(friend))) {
       throwError('All user friends must have a valid ID.', "user-invalid-friends", 400);
      }

      return Object.freeze({
        getFirstName: () => firstName,
        getLastName: () => lastName,
        getEmail: () => email,
        getCreatedOn: () => createdOn,
        getId: () => _id,
        getModifiedOn: () => modifiedOn,
        getHash: () => hash,
        getSalt: () => salt,
        getGroups: () => groups,
        getFriends: () => friends,
        isDisabled: () => disabled,
        resetPassword: (password) => {
         if(!hashMachine.isValidPassword(password)) {
           throwError('Invalid password.', "user-invalid-password", 400, "Passwords must be between 8 and 16 characters long.");
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
         disabled,
         friends,
         hash,
         salt
        }),
      });
    }
  }
};
