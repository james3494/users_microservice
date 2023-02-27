
module.exports = {
  buildLoginUser ({ validateUser, catchError }) {
    return async function (httpRequest) {
     try {
       const { email, password } = httpRequest.body;
       const { user } = await validateUser({ email, password });
       const { _id, firstName, lastName, groups } = user;

       return {
         headers: {
           'Content-Type': 'application/json'
         },
         statusCode: 201,
         body: { _id, firstName, lastName, groups }
       };
     } catch (e) {
       return catchError(e);
     }
    };
  }
};
