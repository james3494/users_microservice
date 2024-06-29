
const { makeUser } = require("../entities");

module.exports = {
    makeValidateUser ({ usersDb, throwError }) {
        return async function ({ email, password }) {

            if (!email) {
                throwError({
                    title: "You must supply an email", 
                    status: 400,
                    error: "user-invalid-email"
                });
            }
            if (!password) {
                throwError({
                    title: "You must supply a password", 
                    status: 400,
                    error: "user-invalid-password"
                });
            }
            const exists = await usersDb.findByEmail({
                email 
            });
            if (!exists) {
                throwError({
                    title: "No user found with that email", 
                    error: "user-not-found", 
                    status: 404
                });
            }

            const userFromDb = makeUser(exists);

            if (userFromDb.isDisabled() === true) {
                throwError({
                    title: "User has been disabled", 
                    error: "user-is-disabled", 
                    status: 403, 
                    detail: "User has been set as disabled, only admins can undisable a user"
                });
            }


            if (userFromDb.isCorrectPassword(password)) {
                return {
                    success: true,
                    user: userFromDb.getAll()
                };
            } else {
                throwError({
                    title: "Email or password incorrect", 
                    error: "auth-incorrect-credentials", 
                    status: 401, 
                    detail: "An incorrect password was supplied"
                });
            }

        };
    }
};
