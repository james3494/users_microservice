module.exports = {
    buildUserValidation: ({ Id, hashMachine }) => ({

      _id: (value) => {
        let rtn = {
          rule: `Must be a valid Id`,
          passed: true,
        };
        if (!Id.isValidId(value)) {
          rtn.passed = false;
          rtn.reason = `_id is not valid Id`;
        }
        return rtn;
      },
      hash: (value) => {
        let rtn = {
          rule: `Must be a valid hash`,
          passed: true,
        };
        if (!hashMachine.isValidHash(value)) {
          rtn.passed = false;
          rtn.reason = `hash is not valid`;
        }
        return rtn;
      },
      salt: (value) => {
        let rtn = {
          rule: `Must be a valid salt`,
          passed: true,
        };
        if (!hashMachine.isValidSalt(value)) {
          rtn.passed = false;
          rtn.reason = `salt is not valid`;
        }
        return rtn;
      },
      disabled: (value) => {
        let rtn = {
          rule: `Must be boolean`,
          passed: true,
        };
        if (typeof value !== "boolean") {
          rtn.passed = false;
          rtn.reason = `disabled is not of type boolean`;
        }
        return rtn;
      },
      createdOn: (value) => {
        let rtn = {
          rule: `Must be of type number (system time) and in the past`,
          passed: true,
        };
        if (typeof value !== "number") {
          rtn.passed = false;
          rtn.reason = `createdOn is not of type number`;
        } else if (value > Date.now()) {
          rtn.passed = false;
          rtn.reason = `createdOn is not in the past`;
        }
        return rtn;
      },
      modifiedOn: (value) => {
        let rtn = {
          rule: `Must be of type number (system time) and in the past`,
          passed: true,
        };
        if (typeof value !== "number") {
          rtn.passed = false;
          rtn.reason = `modifiedOn is not of type number`;
        } else if (value > Date.now()) {
          rtn.passed = false;
          rtn.reason = `modifiedOn is not in the past`;
        }
        return rtn;
      },
      groups: (value) => {
        let rtn = {
          rule: `Must be an array with no repeated entries`,
          passed: true,
        };
        if (typeof value !== "object" || !Array.isArray(value)) {
          rtn.passed = false;
          rtn.reason = `groups is not an array`;
        } else if (new Set(value).size !== value.length) {
          rtn.passed = false;
          rtn.reason = `groups contains repeated entries`;
        }
        return rtn;
      },
      admin: (value) => {
        const allowedAdminPowers = ['users', 'takeout', 'super'];
        let rtn = {
          rule: `Must be an object with keys from ${JSON.stringify(allowedAdminPowers)}. Values must be boolean.`,
          passed: true,
        };
        if (typeof value !== 'object' || Array.isArray(value)) {
          rtn.passed = false;
          rtn.reason = `admin is not an object`;
        } else if (!Object.keys(value).every(power => allowedAdminPowers.includes(power))) {
          rtn.passed = false;
          rtn.reason = `admin contains a disallowed key`;
        } else if (!Object.values(value).every(bool => typeof bool == 'boolean')) {
            rtn.passed = false;
            rtn.reason = `admin has a non-boolean property value`
        }
        return rtn;
      },
      friends: (value) => {
        let rtn = {
          rule: `Must be an array with no repeated entries. All entries must be a valid Id`,
          passed: true,
        };
        if (typeof value !== "object" || !Array.isArray(value)) {
          rtn.passed = false;
          rtn.reason = `friends is not an array`;
        } else if (new Set(value).size !== value.length) {
          rtn.passed = false;
          rtn.reason = `friends contains repeated entries`;
        } else if (!value.every(friend => Id.isValidId(friend))) {
          rtn.passed = false;
          rtn.reason = `friends contains an entry which isnt a valid Id`;
        }
        return rtn;
      },
      firstName: (value) => {
        const minLength = 2,
          maxLength = 30;
        let rtn = {
          rule: `Must be a string between ${minLength} and ${maxLength} characters. Must not contain 'funny' characters`,
          passed: true,
        };
        if (typeof value !== "string") {
          rtn.passed = false;
          rtn.reason = `firstName is not of type string`;
        } else if (value.length < minLength) {
          rtn.passed = false;
          rtn.reason = `firstName is shorter than ${minLength} characters`;
        } else if (value.length > maxLength) {
          rtn.passed = false;
          rtn.reason = `firstName is longer than ${maxLength} characters`;
        } else if ( !!(/[^a-z '-]/i).test(value) ) {
            rtn.passed = false;
            rtn.reason = `firstName contains funny characters`;
        }
        return rtn;
      },
      lastName: (value) => {
        const minLength = 2,
          maxLength = 30;
        let rtn = {
          rule: `Must be a string between ${minLength} and ${maxLength} characters. Must not contain 'funny' characters`,
          passed: true,
        };
        if (typeof value !== "string") {
          rtn.passed = false;
          rtn.reason = `lastName is not of type string`;
        } else if (value.length < minLength) {
          rtn.passed = false;
          rtn.reason = `lastName is shorter than ${minLength} characters`;
        } else if (value.length > maxLength) {
          rtn.passed = false;
          rtn.reason = `lastName is longer than ${maxLength} characters`;
        } else if ( !!(/[^a-z '-]/i).test(value) ) {
            rtn.passed = false;
            rtn.reason = `lastName contains funny characters`;
        }
        return rtn;
      },
      password: (value) => {
        const minLength = 8,
          maxLength = 16;
        let rtn = {
          rule: `Must be a string between ${minLength} and ${maxLength} characters.`,
          passed: true,
        };
        // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/.test(password);
        if (typeof value !== "string") {
          rtn.passed = false;
          rtn.reason = `password is not of type string`;
        } else if (value.length < minLength) {
          rtn.passed = false;
          rtn.reason = `password is shorter than ${minLength} characters`;
        } else if (value.length > maxLength) {
          rtn.passed = false;
          rtn.reason = `password is longer than ${maxLength} characters`;
        }
        return rtn;
      },
      email: (value) => {
        let rtn = {
          rule: `Must be a string and a valid email`,
          passed: true,
        };
        if (typeof value !== "string") {
          rtn.passed = false;
          rtn.reason = `email is not of type string`;
        } else if (!(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/).test(value)) {
          rtn.passed = false;
          rtn.reason = `given email is invalid`;
        } 
        return rtn;
      },

    }),
  };
  