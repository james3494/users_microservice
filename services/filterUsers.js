const { makeUser } = require('../entities');

// maybe make more filters to allow for greater than, less than, not equal etc
// allow for a combination of ands and ors.

module.exports = {
   makeFilterUsers ({ usersDb, throwError }) {
    return async function ({ searchMethod = 'or', ...filters }) {
      let regexFilters = {};
      if (typeof filters != 'object') {
        throwError("Filters must be an object.", 400);
      }

      if (searchMethod !== 'and' && searchMethod !== 'or') {
        throwError("search method must be 'and' or 'or'", 400);
      }

      Object.entries(filters).forEach(([key, value]) => regexFilters[key] = convertToRegex(value));
      const usersFromDb = await usersDb[searchMethod === 'and' ? 'andStyleFilter' : 'orStyleFilter'](regexFilters);

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

    // if it's a string searches for anything LIKE that string. For Boolean's looks for exact match
    // if it's an array looks for the above for all the array values.
    function convertToRegex(fieldVal) {
      if (typeof fieldVal === 'boolean') return fieldVal;
      else if (typeof fieldVal !== 'object') fieldVal = [fieldVal];

      let exp = ``;
      fieldVal.forEach((string, ind) => {
        exp += getRegexOfString(string);
        if (ind != fieldVal.length - 1) exp += `|`;
      });
      return new RegExp(exp, "i");


      function getRegexOfString(string) {
        if (typeof string === 'string') {
          return `.*${string}.*`;
        } else return '';
      }
    }
  }
};
