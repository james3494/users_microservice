require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const express = require('express');
var cookieParser = require('cookie-parser')

const app = express();
app.use(cookieParser())

const api = require ('./routes');
const port = process.env.PORT || 3000;

// check api key
app.use((req, res, next) => {
  const apiKey = req.get("X-Api-Key");
  if (!apiKey || apiKey !== process.env.API_KEY) {
    res.status(403).send('Microservices can only be accessed via the API gateway.');
  } else next();
});

app.use(api);

app.use((req, res, err) => {
  console.error(err.stack);
  console.log(err);
  res.status(500).send('Something broke!');
});

const server = app.listen(port, () => {
  console.log(`Users microservice listening on port ${port}`);
});

module.exports = { server, app };
