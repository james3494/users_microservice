const { makeUser } = require("../entities");

module.exports = {
    makeRemoveUser ({ usersDb, throwError }) {
        return async function ({ _id }) {
            const existingUser = await usersDb.findById({ _id });

            if (!existingUser) {
                throwError({ 
                    title: "No user found to delete.", 
                    error:  "user-not-found", 
                    status: 404, 
                    detail: "No user found with the supplied _id"
                });
            }
            const user = makeUser(existingUser);
            const { deletedCount } = await usersDb.remove({
                _id: user.getId()
            });

            if (deletedCount < 1) {
                throwError({ 
                    title: "Failed to delete user.", 
                    error:  "user-not-deleted", 
                    status: 400, 
                    detail: "The database responded with a deleted count <1"
                });
            }
            return { deletedCount, deletedId: _id };

        };
    }
};
