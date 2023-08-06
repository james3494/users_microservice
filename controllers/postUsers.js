
module.exports = {
  buildRegisterUser ({ addUser }) {
    return async function (httpRequest) {
      const { ...userInfo } = httpRequest.body;
      const { insertedId } = await addUser({ ...userInfo });

      return {
        headers: { 'Content-Type': 'application/json' },
        status: 201,
        body: { insertedId }
      };
    };
  }
};
