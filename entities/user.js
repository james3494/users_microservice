

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
      admin = {},
      friends = [],
      disabled = false,
    } = {}) {

      if (!Id.isValidId(_id)) {
       throwError({
        title: 'User must have a valid id.', 
        error: "user-invalid-id", 
        status: 400
      });
      }
      if (!isValidEmail(email)) {
       throwError({
        title: 'User must have a valid email.', 
        error: "user-invalid-email", 
        status: 400
      });
      }
      if (!isValidName(lastName)) {
       throwError({
        title: 'User must have a valid lastName.', 
        error: "user-invalid-lastName", 
        status: 400
      });
      }
      if (!isValidName(firstName)) {
       throwError({
        title: 'User must have a valid firstName.', 
        error: "user-invalid-firstName", 
        status: 400
      });
      }
      if (!hashMachine.isValidHash(hash)) {
       throwError({
        title: 'User must have a valid hash.', 
        error: "user-invalid-hash", 
        status: 400
      });
      }
      if (!hashMachine.isValidSalt(salt)) {
       throwError({
        title: 'User must have a valid salt.', 
        error: "user-invalid-salt", 
        status: 400
      });
      }
      if (typeof disabled !== 'boolean') {
        throwError({
          title: 'Disabled must be a boolean.', 
          error: "user-invalid-disabled", 
          status: 400
        });
      }
      if (typeof modifiedOn !== 'number' || modifiedOn > Date.now()) {
        throwError({
          title: 'modifiedOn must be a number and in the past.', 
          error: "user-invalid-modifiedOn", 
          status: 400
        });
      }
      if (typeof createdOn !== 'number' || createdOn > Date.now()) {
        throwError({
          title: 'createdOn must be a number and in the past.', 
          error: "user-invalid-createdOn", 
          status: 400
        });
      }
      // groups check
      if (typeof groups !== 'object' || !Array.isArray(groups)) {
       throwError({
        title: 'User groups must be an array.', 
        error: "user-invalid-groups", 
        status: 400
      });
      }
      if ((new Set(groups)).size !== groups.length) {
       throwError({
        title: 'User must not have repeated groups.', 
        error: "user-invalid-groups", 
        status: 400
      });
      }

      if (typeof admin !== 'object' || Array.isArray(admin)) {
        throwError({
         title: 'User admin must be an object.', 
         error: "user-invalid-admin", 
         status: 400
       });
      }
      const allowedAdminPowers = ['users', 'takeOut', 'super'];
      if (!Object.keys(admin).every(power => allowedAdminPowers.includes(power))) {
        throwError({
          title: 'All user admin powers must be one of [' + allowedAdminPowers.reduce((string, power) => string + ' ' + power) + ']', 
          error: "user-invalid-admin", 
          status: 400
       });
      }


      // friends check
      if (typeof friends !== 'object' || !Array.isArray(friends)) {
       throwError({
        title: 'User friends must be an array.', 
        error: "user-invalid-friends", 
        status: 400
      });
      }
      if ((new Set(friends)).size !== friends.length) {
       throwError({
        title: 'User must not have repeated friends.', 
        error: "user-invalid-friends", 
        status: 400
      });
      }
      if (!friends.every(friend => Id.isValidId(friend))) {
       throwError({
        title: 'All user friends must have a valid ID.', 
        error: "user-invalid-friends", 
        status: 400
      });
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
        getAdmin: () => admin,
        getFriends: () => friends,
        isDisabled: () => disabled,
        resetPassword: (password) => {
         if(!hashMachine.isValidPassword(password)) {
           throwError({
            title: 'Invalid password.', 
            error: "user-invalid-password", 
            status: 400, 
            detail: "Passwords must be between 8 and 16 characters long."
          });
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
         admin,
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
