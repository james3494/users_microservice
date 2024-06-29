
module.exports = {
    makeUsersDb ({ makeDb, buildGeneralDb }) {
        return buildGeneralDb({
            makeDb, collectionName: "users", findByEmail 
        });

        async function findByEmail ({ email }) {
            const db = await makeDb();
            const result = await db.collection("users").find({
                email 
            });
            const found = await result.toArray();
            if (found.length === 0) {
                return null;
            }
            return found[0];
        }
    }
};
