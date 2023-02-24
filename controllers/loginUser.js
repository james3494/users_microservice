
module.exports = {
  buildLoginUser ({ logUserIn, catchError, generateToken, generateRefreshToken }) {
    return async function (httpRequest) {
     try {
       const { email, password } = httpRequest.body;
       const loggedIn = await logUserIn({ email, password });

       const jwt = generateToken(loggedIn);

       // const refresh = generateRefreshToken(loggedIn);
       // function setCookies(res){
       //   res.cookie('refreshToken', refresh, {
       //      httpOnly: true,
       //      sameSite: 'None',
       //      secure: true,
       //      maxAge: 7 * 24 * 60 * 60 * 1000
       //   });
       // }

       return {
         headers: { 'Content-Type': 'application/json' },
         statusCode: 201,
         body: { jwt },
         // setCookies
       };
     } catch (e) {
       return catchError(e);
     }
    };
  }
};
