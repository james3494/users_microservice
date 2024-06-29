/*
Populates test database. There are a few options:

a) a number. this corresponds to a file in the ./data folder
b) an object with collection keys. This corresponds to direct data (similar to what is in the ./data files)
c) falsy - implies the data populated doesn't matter - this will do nothing. 
Similarly, if a particular database is blank it implies the data doesn't matter.

Structure of data:

data = {
    users: []
}

*/

const { usersDb } = require("../dataAccess");


module.exports = async (data) => {
    if (!data) {
        return;
    }
    if (typeof data === "number") {
        data = require(`./data/${data}.js`);
    }
    
    if (typeof data !== "object") {
        throw Error("invalid test data structure");
    }

    if (data.users) {
        await usersDb.removeAll();
        if (data.users.length) {
            await usersDb.insertMany(data.users);
        }
    }
};