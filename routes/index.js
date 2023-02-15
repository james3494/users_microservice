const { makeExpressCallback } = require('../expressCallback/index');
const express = require('express');
const api = express.Router();
const { registerUser, loginUser, logoutUser, getCurrentUser, disableUser } = require('../controllers');

api.use(express.json());

api.post( '/api/user/register', makeExpressCallback(registerUser) );
api.post( '/api/user/login', makeExpressCallback(loginUser) );
api.post( '/api/user/logout', makeExpressCallback(logoutUser) );
api.post( '/api/user/get', makeExpressCallback(getCurrentUser) );
api.post( '/api/user/delete', makeExpressCallback(disableUser) );

module.exports = api;
