
module.exports = {
  buildGetCurrentUser ({ filterUsers, catchError }) {
    return async function (httpRequest) {
     try {
       const sessionID = httpRequest.cookies.sessionID;
       const users = await filterUsers({ sessionID });
       return {
         headers: {
           'Content-Type': 'application/json',
         },
         statusCode: 201,
         body: users.length == 1 ? users[0] : null
       };
     } catch (e) {
       return catchError(e);
     }
    };
  }
};
