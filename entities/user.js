/* TODO
set refresh time for jwt token
edit users endpoint - seperate endpoint for make admin, disable etc?
make sure correct Post, get, put delete etc
*/

module.exports = {
  buildMakeUser ({ Id, hashMachine, throwError }) {
   return function ({
     email,
     firstName,
     lastName,
     createdOn = Date.now(),
     _id = Id.makeId(),
     modifiedOn = Date.now(),
     salt = hashMachine.genSalt(),
     hash = hashMachine.hash(hashMachine.getDefaultPassword(), salt),
     groups = [],
     lastLogin = null,
     disabled = false,
   } = {}) {

     if (!Id.isValidId(_id)) {
       throwError('User must have a valid id.', 400);
     }
     checkName(firstName, 'first');
     checkName(lastName, 'last');

     if (!email || typeof email !== 'string' || !(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) ) {
       throwError('User must have a valid email.', 400);
     }
     if (!hashMachine.isValidHash(hash)) {
       throwError('User must have a valid hash.', 400);
     }

     return Object.freeze({
       getFirstName: () => firstName,
       getLastName: () => lastName,
       setFirstName: (newFirstName) => {
         checkName(firstName, 'first');
         firstName = newFirstName;
         modifiedOn = Date.now();
       },
       setLastName: (newLastName) => {
         checkName(lastName, 'first');
         lastName = newLastName;
         modifiedOn = Date.now();
       },
       getEmail: () => email,
       getCreatedOn: () => createdOn,
       getId: () => _id,
       getModifiedOn: () => modifiedOn,
       getLastLogin: () => lastLogin,
       getHash: () => hash,
       getSalt: () => salt,
       getGroups: () => groups,
       makeAdmin,
       unmakeAdmin,
       makeSuperAdmin,
       unmakeSuperAdmin,
       isDisabled: () => disabled,
       disable: () => disabled = true,
       undisable: () => disabled = false,
       login: () => {
         lastLogin = Date.now();
       },
       resetPassword: (password) => {
         // first check password passes checks here
         hash = hashMachine.hash(password, salt);
       },
       isCorrectPassword: (password) => {
         return hashMachine.hash(password, salt) == hash;
       },
       // the following is what will be inserted into the database. should match the inputs for this entity
       getAll: () => ({
         firstName,
         lastName,
         email,
         createdOn,
         _id,
         modifiedOn,
         groups,
         lastLogin,
         disabled,
         hash,
         salt
       }),
     });

     function checkName (name, messageWord) {
       if (!name) {
         throwError(`User must have a ${messageWord} name.`, 400);
       }
       if (typeof name != 'string') {
         throwError(`User's ${messageWord} name must be a string.`, 400);
       }
       if (name.length < 2) {
         throwError(`User's ${messageWord} name must be longer than 2 characters.`, 400);
       }
     }

     function makeAdmin() {
       if (groups.indexOf('admin') < 0) {
         groups.push('admin');
         modifiedOn = Date.now();
       }
     }

     function unmakeAdmin() {
       unmakeSuperAdmin();
       const adminIndex = groups.indexOf('admin');
       if (adminIndex >= 0) {
         groups.splice(adminIndex, 1);
         modifiedOn = Date.now();
       }
     }

     function makeSuperAdmin() {
       makeAdmin();
       if (groups.indexOf('superAdmin') < 0) {
         groups.push('superAdmin');
         modifiedOn = Date.now();
       }
     }

     function unmakeSuperAdmin() {
       const superAdminIndex = groups.indexOf('superAdmin');
       if (superAdminIndex >= 0) {
         groups.splice(superAdminIndex, 1);
         modifiedOn = Date.now();
       }
     }

   };
 }
};
