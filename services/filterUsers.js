const { makeUser } = require('../entities');

// expects filters to be a mongodb style object. A bit bad that we need mongo specific code now floating around elsewhere

module.exports = {
   makeFilterUsers ({ usersDb, throwError }) {
    return async function ({ ...filters }) {

      if (typeof filters !== 'object') {
        throwError({ 
          title: "Invalid filters.", 
          error: "user-invalid-filter-object", 
          status: 400, 
          detail: "The filters parameter must be an object"
        });
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
