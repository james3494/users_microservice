
module.exports = {
  buildLogoutUser ({ logUserOut, catchError }) {
    return async function (httpRequest) {
     try {
       const sessionID = httpRequest.cookies.sessionID;
       const loggedOut = await logUserOut({ sessionID });
       return {
         headers: {
           'Content-Type': 'application/json',
           'Set-Cookie': 'sessionID=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
         },
         statusCode: 201,
         body: { ...loggedOut }
       };
     } catch (e) {
       catchError(e);
     }
    };
  }
};
