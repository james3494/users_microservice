const { makeExpressCallback } = require('../expressCallback/index');
const express = require('express');
const api = express.Router();
const { registerUser, loginUser, logoutUser, getCurrentUser, disableUser, editUser, userSearch, resetPassword, refreshToken } = require('../controllers');

api.use(express.json());

api.post( `${process.env.PATH_ROUTE}/sessions`, makeExpressCallback(loginUser) );
api.post( `${process.env.PATH_ROUTE}/sessions/refresh`, makeExpressCallback(refreshToken) );
api.post( `${process.env.PATH_ROUTE}/users`, makeExpressCallback(registerUser) );
api.put( `${process.env.PATH_ROUTE}/users/:_id/disabled`, makeExpressCallback(disableUser) );
api.put( `${process.env.PATH_ROUTE}/users/:_id/password`, makeExpressCallback(resetPassword) );
api.put( `${process.env.PATH_ROUTE}/users/:_id`, makeExpressCallback(editUser) ); // want to combine the above into one put and change them to one controller?
api.get( `${process.env.PATH_ROUTE}/users`, makeExpressCallback(userSearch) ); // include search parameters, returns array
api.get( `${process.env.PATH_ROUTE}/users/:_id`, makeExpressCallback(userSearch) ); // returns single user
api.get( `${process.env.PATH_ROUTE}/users/:_id/:_field`, makeExpressCallback(userSearch) ); // returns field of user. May not be allowed everything

module.exports = api;
