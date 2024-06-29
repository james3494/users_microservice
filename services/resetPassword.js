const { makeUser } = require("../entities");

module.exports = {
    makeResetPassword ({ usersDb, throwError }) {
        return async function ({ _id, oldPassword, newPassword }) {
            if (!_id) {
                throwError({
                    title: "You must supply a user id to reset the password.", 
                    error: "user-no-id-supplied", 
                    status: 400
                });
            }

            const userJson = await usersDb.findById({
                _id 
            });
            if (!userJson) {
                throwError({
                    title: "No user found.", 
                    status: 404, 
                    error: "user-not-found", 
                    detail: "No user found with the given _id"
                });
            }

            const user = makeUser(userJson);

            if (user.isCorrectPassword(oldPassword)) {
                user.resetPassword(newPassword);
                return await usersDb.update({
                    _id: user.getId(),
                    modifiedOn: Date.now(),
                    hash: user.getHash()
                });

            } else {
                throwError({
                    title: "Password incorrect.", 
                    error: "auth-incorrect-credentials", 
                    status: 401, 
                    detail: "Unable to reset password as the old password given is incorrect"
                });
            }

        };
    }
} ;
