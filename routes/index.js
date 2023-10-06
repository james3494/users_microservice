const { buildMakeExpressCallback } = require('../expressCallback/index');
const catchError = require('errorHandling').buildCatchError({ logErrors: process.env.LOG_ERRORS });
const parseQuery = (query) => {
  if (query) {
    let newQuery = {};
    Object.entries(query).forEach(([key, value]) => {
      try {
        newQuery[key] = JSON.parse(value);
      } catch {
        newQuery[key] = value;
      }
    });
    return newQuery;
  }
};


const makeExpressCallback = buildMakeExpressCallback({ catchError, parseQuery })

const express = require('express');
const api = express.Router();
const {
  postUsers,
  postAuth,
  putDisabled,
  patchUsers,
  getUsers,
  putPassword,
  deleteUsers
} = require('../controllers');

api.use(express.json({limit: '20mb'}));

api.post( `${process.env.PATH_ROUTE}/auth`, makeExpressCallback(postAuth) );
api.post( `${process.env.PATH_ROUTE}/user`, makeExpressCallback(postUsers) );
api.delete( `${process.env.PATH_ROUTE}/user/:_id`, makeExpressCallback(deleteUsers) );
api.put( `${process.env.PATH_ROUTE}/user/:_id/disabled`, makeExpressCallback(putDisabled) );
api.put( `${process.env.PATH_ROUTE}/user/:_id/password`, makeExpressCallback(putPassword) );
api.patch( `${process.env.PATH_ROUTE}/user/:_id`, makeExpressCallback(patchUsers) );
api.get( `${process.env.PATH_ROUTE}/user`, makeExpressCallback(getUsers) ); // include search parameters, returns array
api.get( `${process.env.PATH_ROUTE}/user/:_id`, makeExpressCallback(getUsers) ); // returns single user
api.get( `${process.env.PATH_ROUTE}/ping`, (req, res) => res.send("You pinged the user microservice!") );

module.exports = api;
