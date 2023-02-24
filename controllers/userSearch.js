// TODO: allow filtering by disabled, admin etc
// TODO : this is a bit hacky in terms of switching whether param or query
module.exports = {
  buildUserSearch ({ filterUsers, catchError }) {
    return async function (httpRequest) {
     try {
       const { ...filters } = httpRequest.query;
       const { _id, field } = httpRequest.params;

       let fiterObj = {};
       if (_id) {
         filterObj = {
           searchMethod: 'and',
           _id
         }
       } else {
         if (filters && filters.search) {
           const exploded = filters.search.split(' ');
           filterObj = {
             searchMethod: 'or',
             firstName: exploded,
             lastName: exploded,
           }
         }
       }

       const filtered = await filterUsers(filterObj);

       if (_id) {
         filtered = filtered[0];
         if (field) filtered = filtered[field];
       }

       return {
         headers: { 'Content-Type': 'application/json' },
         statusCode: 201,
         body: filtered
       };
     } catch (e) {
       return catchError(e);
     }
    };
  }
};
