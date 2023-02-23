// TODO: make refresh token use different secret, and encode less information

module.exports = {
  buildLoginUser ({ logUserIn, catchError, generateToken }) {
    return async function (httpRequest) {
     try {
       const { email, password } = httpRequest.body;
       const loggedIn = await logUserIn({ email, password });
       const jwt = generateToken(loggedIn);

       // const refreshTimeout = 7;
       // const refresh = generateToken(loggedIn, `${refreshTimeout}d`);
      //  res.cookie('jwt', refresh, { httpOnly: true,
      //   sameSite: 'None', secure: true,
      //   maxAge: refreshTimeout * 24 * 60 * 60 * 1000
      // });
       return {
         headers: { 'Content-Type': 'application/json' },
         statusCode: 201,
         body: { jwt }
       };
     } catch (e) {
       return catchError(e);
     }
    };
  }
};
