
module.exports = {
  buildLoginUser ({ logUserIn, catchError, generateToken }) {
    return async function (httpRequest) {
     try {
       const { email, password } = httpRequest.body;
       const loggedIn = await logUserIn({ email, password });
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
