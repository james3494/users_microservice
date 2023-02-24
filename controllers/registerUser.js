
module.exports = {
  buildRegisterUser ({ addUser, catchError }) {
    return async function (httpRequest) {
     try {
       const { ...userInfo } = httpRequest.body;
       const insertedId = await addUser({ ...userInfo });

       return {
         headers: { 'Content-Type': 'application/json' },
         statusCode: 201,
         body: { insertedId }
       };
     } catch (e) {
       return catchError(e);
     }
    };
  }
};
