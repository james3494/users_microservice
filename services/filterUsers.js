const { makeUser } = require("../entities");

module.exports = {
    makeFilterUsers ({ usersDb, throwError }) {
        return async function ({ ...filters }) {

            if (typeof filters !== "object") {
                throwError({ 
                    title: "Invalid filters.", 
                    error: "user-invalid-filter-object", 
                    status: 400, 
                    detail: "The filters parameter must be an object"
                });
            }

            const usersFromDb = await usersDb.smartFilter(filters);

            let usersRtn = [];
            // do try catch statements in a loop to prevent it dying if there's one corrupt user
            (usersFromDb || []).forEach(userInfo => {
                try {
                    const user = makeUser(userInfo);
                    usersRtn.push(user.getAll());
                } catch (e) {
                    console.log(e);
                }
            });
            return usersRtn;
        };

    }
};
