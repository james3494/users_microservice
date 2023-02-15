/* TODO
add token to prevent access from illegal people / add security measure eg admin accessible endpoints etc
edit users endpoint - seperate endpoint for make admin, disable etc?
error handling / codes - custom error with status. also allows us to pass safe essages onto the browser
make sure correct Post, get, put delete etc
*/

module.exports = {
  buildMakeUser ({ Id, hashMachine, MyError }) {
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
     sessionID = null,
     lastLogin = null,
     stayLoggedIn = false,
     disabled = false,
   } = {}) {
     if (!Id.isValidId(_id)) {
       throw new MyError('User must have a valid id.');
     }
     if (sessionID != null && !Id.isValidId(sessionID)) {
       throw new MyError('User must have a valid sessionID.');
     }
     checkName(firstName, 'first');
     checkName(lastName, 'last');

     if (!email || typeof email !== 'string' || !(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) ) {
       throw new MyError('User must have a valid email.');
     }
     if (!hashMachine.isValidHash(hash)) {
       throw new MyError('User must have a valid hash.');
     }

     return Object.freeze({
       getFirstName: () => firstName,
       getLastName: () => lastName,
       getEmail: () => email,
       getCreatedOn: () => createdOn,
       getId: () => _id,
       getSessionId: () => sessionID,
       getModifiedOn: () => modifiedOn,
       getLastLogin: () => lastLogin,
       getStayLoggedIn: () => stayLoggedIn,
       getHash: () => hash,
       getSalt: () => salt,
       getGroups: () => groups,
       makeAdmin: () => {
         if (groups.indexOf('admin') < 0) {
           groups.push('admin');
           modifiedOn = Date.now();
         }
       },
       unmakeAdmin: () => {
         const adminIndex = groups.indexOf('admin');
         if (adminIndex >= 0) {
           groups.splice(adminIndex, 1);
           modifiedOn = Date.now();
         }
       },
       isDisabled: () => disabled,
       disable: () => {
         logout();
         disabled = true;
       },
       undisable: () => disabled = false,
       isLoggedin: () => sessionID != null,
       login: (wantToStayLoggedIn) => {
         sessionID = Id.makeId();
         lastLogin = Date.now();
         stayLoggedIn = wantToStayLoggedIn;
       },
       resetPassword: (password) => {
         hash = hashMachine.hash(password, salt);
       },
       isCorrectPassword: (password) => {
         return hashMachine.hash(password, salt) == hash;
       },
       logout,
       // the following is what will be inserted into the database. should match the inputs for this entity
       getAll: () => ({
         firstName,
         lastName,
         email,
         createdOn,
         _id,
         sessionID,
         modifiedOn,
         groups,
         lastLogin,
         disabled,
         stayLoggedIn,
         hash,
         salt
       }),
     });
     function logout() {
       sessionID = null;
       stayLoggedIn = false;
     }

     function checkName (name, messageWord) {
       if (!name) {
         throw new MyError(`User must have a ${messageWord} name.`);
       }
       if (typeof name != 'string') {
         throw new MyError(`User's ${messageWord} name must be a string.`);
       }
       if (name.length < 2) {
         throw new MyError(`User's ${messageWord} name must be longer than 2 characters.`);
       }
     }

   };
 }
};
