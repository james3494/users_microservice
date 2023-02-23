// TODO: allow filtering by isabled, admin etc
module.exports = {
  buildUserSearch ({ filterUsers, catchError }) {
    return async function (httpRequest) {
     try {
       const { searchString } = httpRequest.body;
       const exploded = searchString.split(' ');
       const filtered = await filterUsers({
         searchMethod: 'or',
         firstName: exploded,
         lastName: exploded,
       });

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
