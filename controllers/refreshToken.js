
module.exports = {
  buildRefreshToken ({ filterUsers, catchError, getUserFromReq, throwError, generateToken, decodeRefreshToken }) {
    return async function (httpRequest) {
     try {
       const { refreshToken } = httpRequest.cookies;

       const reqFrom = getUserFromReq(httpRequest);
       if (!reqFrom) {
         throwError("You must be logged in to request a new access token.", 403);
       }
       const decoded = await decodeRefreshToken(refreshToken);
       console.log(decoded);
       if (!decoded) {
         throwError("Error decoding refresh token.", 403);
       }
       const user = await filterUsers({ searchMethod: 'and', _id: reqFrom._id });
       const jwt = generateToken(user[0]);

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
