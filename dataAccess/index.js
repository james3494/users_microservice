const mongodb = require('mongodb');

const { makeUsersDb } = require('./usersDb');

const MongoClient = mongodb.MongoClient;
const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;
const db = { connected : false };

if(!url) throw new Error ('No db url found');
if(!dbName) throw new Error ('No db name found');

db.client = new MongoClient(url);
db.client.on('open', () => db.connected=true );
db.client.on('topologyClosed', () => db.connected=false );


const makeDb = async function () {
  if (!db.connected) {
    await db.client.connect();
  }
  return db.client.db(dbName);
};

const usersDb = makeUsersDb({ makeDb });

module.exports =  { usersDb, makeDb };
