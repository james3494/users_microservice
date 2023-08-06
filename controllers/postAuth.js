
module.exports = {
  buildLoginUser ({ validateUser }) {
    return async function (httpRequest) {
      const { email, password } = httpRequest.body;
      const { user } = await validateUser({ email, password });
      const { _id, firstName, lastName, groups } = user;

      return {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 201,
        body: { _id, firstName, lastName, groups }
      };
    };
  }
};
