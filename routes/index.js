const { makeExpressCallback } = require('../expressCallback/index');
const express = require('express');
const api = express.Router();
const { registerUser, loginUser, logoutUser, getCurrentUser, disableUser } = require('../controllers');

api.use(express.json());

api.post( `${process.env.PATH_ROUTE}/register`, makeExpressCallback(registerUser) );
api.post( `${process.env.PATH_ROUTE}/login`, makeExpressCallback(loginUser) );
api.post( `${process.env.PATH_ROUTE}/delete`, makeExpressCallback(disableUser) );

module.exports = api;
