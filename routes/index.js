const { buildMakeExpressCallback } = require('../expressCallback/index');
const { catchError } = require('errorHandling');


const makeExpressCallback = buildMakeExpressCallback({ catchError })

const express = require('express');
const api = express.Router();
const {
  postUsers,
  postAuth,
  putDisabled,
  putUsers,
  getUsers,
  putPassword,
  refreshToken,
  putAdmin
} = require('../controllers');

api.use(express.json());

api.post( `${process.env.PATH_ROUTE}/auth`, makeExpressCallback(postAuth) );
api.post( `${process.env.PATH_ROUTE}/users`, makeExpressCallback(postUsers) );
api.put( `${process.env.PATH_ROUTE}/users/:_id/disabled`, makeExpressCallback(putDisabled) );
api.put( `${process.env.PATH_ROUTE}/users/:_id/password`, makeExpressCallback(putPassword) );
api.put( `${process.env.PATH_ROUTE}/users/:_id/admin`, makeExpressCallback(putAdmin) );
api.put( `${process.env.PATH_ROUTE}/users/:_id`, makeExpressCallback(putUsers) );
api.get( `${process.env.PATH_ROUTE}/users`, makeExpressCallback(getUsers) ); // include search parameters, returns array
api.get( `${process.env.PATH_ROUTE}/users/:_id`, makeExpressCallback(getUsers) ); // returns single user
api.get( `${process.env.PATH_ROUTE}/users/:_id/:_field`, makeExpressCallback(getUsers) ); // returns field of user. May not be allowed everything

module.exports = api;
