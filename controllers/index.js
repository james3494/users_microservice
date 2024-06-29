
const { addUser, validateUser, editUser, resetPassword, filterUsers, removeUser } = require("../services");
const { buildRegisterUser } = require("./postUsers");
const { buildLoginUser } = require("./postAuth");
const { buildDisableUser } = require("./putDisabled");
const { buildResetPassword } = require("./putPassword");
const { buildEditUser } = require("./patchUsers");
const { buildUserSearch } = require("./getUsers");
const { buildDeleteUser } = require("./deleteUsers");

const throwError = require("../errorHandling").buildThrowError({
    logErrors: process.env.LOG_ERRORS 
});

const userController = Object.freeze({
    postUsers : buildRegisterUser({
        addUser 
    }),
    putDisabled: buildDisableUser({
        editUser, throwError 
    }),
    getUsers: buildUserSearch({
        filterUsers, throwError 
    }),
    patchUsers: buildEditUser({
        editUser, throwError 
    }),
    putPassword: buildResetPassword({
        resetPassword, throwError 
    }),
    postAuth: buildLoginUser({
        validateUser 
    }),
    deleteUsers: buildDeleteUser({
        removeUser, throwError 
    })
});

module.exports = {
    ...userController 
};
