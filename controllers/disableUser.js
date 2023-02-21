
module.exports = {
  buildDisableUser ({ editUser, catchError }) {
    return async function (httpRequest) {
     try {
       const { ...userInfo } = httpRequest.body;
       const success = await editUser({
          _id: userInfo._id,
          disabled: true 
        });

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
