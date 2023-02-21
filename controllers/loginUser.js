
module.exports = {
  buildLoginUser ({ logUserIn, catchError, generateToken, decodeToken }) {
    return async function (httpRequest) {
     try {
       const { email, password } = httpRequest.body;
       const loggedIn = await logUserIn({ email, password });
       const jwt = generateToken(loggedIn);

       return {
         headers: {
           'Content-Type' : 'application/json' ,
         },
         statusCode: 201,
         body: { jwt }
       };
     } catch (e) {
       return catchError(e);
     }
    };
  }
};
