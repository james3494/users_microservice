
module.exports = {
  buildRegisterUser ({ addUser, catchError }) {
    return async function (httpRequest) {
     try {
       const { ...userInfo } = httpRequest.body;
       const registered = await addUser({ ...userInfo });
       
       return {
         headers: { 'Content-Type': 'application/json' },
         statusCode: 201,
         body: { ...registered }
       };
     } catch (e) {
       return catchError(e);
     }
    };
  }
};
