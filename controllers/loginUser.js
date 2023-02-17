
module.exports = {
  buildLoginUser ({ logUserIn, catchError, generateToken }) {
    return async function (httpRequest) {
     try {
       const { email, password, stayLoggedIn } = httpRequest.body;
       const loggedIn = await logUserIn({ email, password, stayLoggedIn });
       const jwtToken = generateToken(loggedIn);

       return {
         headers: {
           'Content-Type' : 'application/json' ,
         },
         statusCode: 201,
         body: { jwtToken }
       };
     } catch (e) {
       return catchError(e);
     }
    };
  }
};
