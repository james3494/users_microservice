
const { addUser, logUserIn, logUserOut, filterUsers, disableUser } = require('../services');
const { buildRegisterUser } = require('./registerUser');
const { buildLoginUser } = require('./loginUser');
const { buildLogoutUser } = require('./logoutUser');
const { buildGetCurrentUser } = require('./getCurrentUser');
const { buildDisableUser } = require('./disableUser');
const { catchError, throwError } = require('errorHandling');
const { generateToken } = require('authentication');


async function decodeToken(httpRequest) {
  const token = httpRequest.headers.Authorization.split(' ')[1];
  if (!token) return null;
  else return await jwt.verify(jwtToken, process.env.TOKEN_PUBLIC, (err, decoded) => {
    if (err) {
      console.log(err);
      throwError(err.message, 401);
    } else return decoded;
  });
}

const userController = Object.freeze({
  registerUser : buildRegisterUser({ addUser, catchError }),
  loginUser: buildLoginUser({ logUserIn, catchError, generateToken }),
  logoutUser: buildLogoutUser({ logUserOut, catchError, decodeToken }),
  getCurrentUser: buildGetCurrentUser({ filterUsers, catchError }),
  disableUser: buildDisableUser({ disableUser, catchError, decodeToken }),
});

module.exports = { ...userController };
