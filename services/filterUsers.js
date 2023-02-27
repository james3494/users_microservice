const { makeUser } = require('../entities');

// expects filters to be a mongodb style object. A bit bad that we need mongo specific code now floating around elsewhere

module.exports = {
   makeFilterUsers ({ usersDb, throwError }) {
    return async function ({ ...filters }) {

      if (typeof filters !== 'object') {
        throwError("Filters must be an object.", 400);
      }

      const usersFromDb = await usersDb.customFind(filters);

      let usersRtn = [];
      // do try catch statements in a loop to prevent it dying if there's one corrupt user
      (usersFromDb || []).forEach(userInfo => {
        try {
          const user = makeUser(userInfo);
          usersRtn.push( user.getAll() );
        } catch (e) {
          console.log(e);
        }
      });
      return usersRtn;
    };

  }
};
