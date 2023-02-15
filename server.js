require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const express = require('express');
const app = express();

const api = require ('./routes');

const port = process.env.PORT || 3000;

// allow cors requests from localhost
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(api);

app.use((err, req, res) => {
  console.error(err.stack);
  console.log(err);
  res.status(500).send('Something broke!');
});

const server = app.listen(port, () => {
  console.log(`Users microservice listening on port ${port}`);
});

module.exports = { server, app };
