const { buildMakeExpressCallback } = require('../expressCallback/index');

const makeExpressCallback = buildMakeExpressCallback({
  getCookies: (req) => req.cookies // the cookie parser is being used so we can easily get cookies
})

const express = require('express');
const api = express.Router();
const {
  postUsers,
  postSessions,
  putDisabled,
  putUsers,
  getUsers,
  putPassword,
  refreshToken,
  putAdmin
} = require('../controllers');

api.use(express.json());

api.post( `${process.env.PATH_ROUTE}/sessions`, makeExpressCallback(postSessions) );
api.post( `${process.env.PATH_ROUTE}/users`, makeExpressCallback(postUsers) );
api.put( `${process.env.PATH_ROUTE}/users/:_id/disabled`, makeExpressCallback(putDisabled) );
api.put( `${process.env.PATH_ROUTE}/users/:_id/password`, makeExpressCallback(putPassword) );
api.put( `${process.env.PATH_ROUTE}/users/:_id/admin`, makeExpressCallback(putAdmin) );
api.put( `${process.env.PATH_ROUTE}/users/:_id`, makeExpressCallback(putUsers) );
api.get( `${process.env.PATH_ROUTE}/users`, makeExpressCallback(getUsers) ); // include search parameters, returns array
api.get( `${process.env.PATH_ROUTE}/users/:_id`, makeExpressCallback(getUsers) ); // returns single user
api.get( `${process.env.PATH_ROUTE}/users/:_id/:_field`, makeExpressCallback(getUsers) ); // returns field of user. May not be allowed everything

module.exports = api;
