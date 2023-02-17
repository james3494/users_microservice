
module.exports = {
  buildDisableUser ({ disableUser, catchError }) {
    return async function (httpRequest) {
     try {
       const { ...userInfo } = httpRequest.body;
       const success = await disableUser({ ...userInfo });
       
       return {
         headers: {
           'Content-Type': 'application/json',
         },
         statusCode: 201,
         body: { ...success }
       };
     } catch (e) {
       return catchError(e);
     }
    };
  }
};
