
module.exports = {
  buildLogoutUser ({ logUserOut, catchError, decodeToken }) {
    return async function (httpRequest) {
     try {
       const { _id } = decodeToken(httpRequest)
       await logUserOut({ _id });
       return {
         headers: {
           'Content-Type': 'application/json',
         },
         statusCode: 201,
       };
     } catch (e) {
       return catchError(e);
     }
    };
  }
};
