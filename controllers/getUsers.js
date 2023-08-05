// TODO: allow filtering by disabled, admin etc
// TODO : this is a bit hacky in terms of switching whether param or query
// TODO: dob't return the whole object / only allow certain fields
module.exports = {
  buildUserSearch ({ filterUsers, catchError }) {
    return async function (httpRequest) {
     try {
       const { ...filters } = httpRequest.query;
       const { _id, field } = httpRequest.params;

       let fiterObj = {};
       if (_id) {
         filterObj = {
           _id
         }
       } else {
         if (filters && filters.search) {
           const exploded = filters.search.split(' ').map(string => {
             const exp = `.*${string}.*`;
             return new RegExp(exp, "i");
           });
           filterObj = {
             $or: [
               { firstName: { $in: exploded } },
               { lastName: { $in: exploded } },
             ],
           }
         }
       }
       let filtered = await filterUsers(filterObj);

       if (_id) {
         filtered = filtered[0];
         // todo some checks whether this field is acceptable to get
         if (field) filtered = filtered[field];
       }

       return {
         headers: { 'Content-Type': 'application/json' },
         status: 201,
         body: filtered
       };
     } catch (e) {
       return catchError(e);
     }
    };
  }
};
