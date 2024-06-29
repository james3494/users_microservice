
module.exports = {
    buildRegisterUser ({ addUser }) {
        return async function (httpRequest) {
            // only accept these parameters so an admin permission can't sneak through
            const { firstName, lastName, email, password } = httpRequest.body;
            const { insertedId } = await addUser({ firstName, lastName, email, password });

            return {
                headers: { "Content-Type": "application/json" },
                status: 201,
                body: { insertedId }
            };
        };
    }
};
