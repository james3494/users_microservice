require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const express = require('express');
const app = express();
const api = require ('./routes');
const port = process.env.PORT || 3000;

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
