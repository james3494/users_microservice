module.exports = {
  buildMakeUser({ Id, hashMachine, throwError, validation }) {
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
      phone = null,
      subscription = "free",
      photo = null
    } = {}) {
      const getAll = () => ({
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
        salt,
        phone,
        subscription,
        photo
      });

      Object.entries(getAll()).forEach(([key, value]) => {
        if (!validation[key])
          throwError({
            status: 500,
            title: "no validation found for " + key,
            error: "validation-missing-key",
          });
        const { passed, rule, reason } = validation[key](value);
        if (!passed)
          throwError({
            status: 400,
            error: "user-invalid-" + key,
            title: rule,
            detail: reason,
          });
      });
      

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
        getPhone: () => phone,
        getSubscription: () => subscription,
        getPhoto: () => photo,
        resetPassword: (password) => {
          const { passed, rule, reason } = validation.password(password);
          if (!passed)
            throwError({
              status: 400,
              error: "user-invalid-password",
              title: rule,
              detail: reason,
            });
          hash = hashMachine.hash(password, salt);
        },
        isCorrectPassword: (password) => {
          return hashMachine.hash(password, salt) == hash;
        },
        getAll,
      });
    };
  },
};
