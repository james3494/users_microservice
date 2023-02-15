
module.exports = {
  buildDisableUser ({ disableUser, catchError }) {
    return async function (httpRequest) {
     try {
       const { ...userInfo } = httpRequest.body;
       const user = await disableUser({ ...userInfo });
       return {
         headers: {
           'Content-Type': 'application/json',
         },
         statusCode: 201,
         body: { ...user }
       };
     } catch (e) {
       catchError(e);
     }
    };
  }
};
