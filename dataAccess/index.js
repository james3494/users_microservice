
const { makeUsersDb } = require("./usersDb");
const { makeDb, buildGeneralDb } = require("../database");

const usersDb = makeUsersDb({
    makeDb, buildGeneralDb 
});

module.exports =  {
    usersDb 
};
