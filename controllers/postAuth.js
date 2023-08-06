
module.exports = {
  buildLoginUser ({ validateUser }) {
    return async function (httpRequest) {
      const { email, password } = httpRequest.body;
      const { user } = await validateUser({ email, password });
      const { _id } = user;

      return {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 200,
        body: { _id }
      };
    };
  }
};
