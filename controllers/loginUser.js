
module.exports = {
  buildLoginUser ({ logUserIn, catchError }) {
    return async function (httpRequest) {
     try {
       const { ...userInfo } = httpRequest.body;
       const loggedIn = await logUserIn({ sessionID : httpRequest.cookies?.sessionID, ...userInfo });

       let headers = { 'Content-Type' : 'application/json' };
       if( loggedIn.sessionID ) headers['Set-Cookie'] = `sessionID=${loggedIn.sessionID}`;

       return {
         headers,
         statusCode: 201,
         body: { ...loggedIn }
       };
     } catch (e) {
       catchError(e);
     }
    };
  }
};
