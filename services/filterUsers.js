const { makeUser } = require('../entities');

// maybe make more filters to allow for greater than, less than, not equal etc

module.exports = {
   makeFilterUsers ({ usersDb, throwError }) {
    return async function ({ ...filters }) {
      let regexFilters = {};
      if (typeof filters != 'object') {
        throwError("Filters must be an object.", 400);
      }

      Object.entries(filters).forEach(([key, val]) => regexFilters[key] = convertToRegex(val));
      const usersFromDb = await usersDb.filterByRegex(regexFilters);

      let usersRtn = [];
      // do try catch statements in a loop to prevent it dying if there's one corrupt user
      (usersFromDb || []).forEach(user => {
        try {
          usersRtn.push( makeUser(user).getAll() );
        } catch (e) {
          console.log(e);
        }
      });
      return usersRtn;
    };

    // if it's a string searches for anything LIKE that string. For Boolean's looks for exact match
    function convertToRegex(fieldVal) {
      if (typeof fieldVal == 'string') {
        const exp = `.*${fieldVal}.*`;
        return new RegExp(exp, "g");
      } else return fieldVal;
    }
  }
};
