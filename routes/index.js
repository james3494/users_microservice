const { makeExpressCallback } = require('../expressCallback/index');
const express = require('express');
const api = express.Router();
const { registerUser, loginUser, logoutUser, getCurrentUser, disableUser, editUser, userSearch } = require('../controllers');

api.use(express.json());

api.post( `${process.env.PATH_ROUTE}/register`, makeExpressCallback(registerUser) );
api.post( `${process.env.PATH_ROUTE}/login`, makeExpressCallback(loginUser) );
api.post( `${process.env.PATH_ROUTE}/disable`, makeExpressCallback(disableUser) );
api.post( `${process.env.PATH_ROUTE}/edit`, makeExpressCallback(editUser) );
api.post( `${process.env.PATH_ROUTE}/search`, makeExpressCallback(userSearch) );

module.exports = api;
