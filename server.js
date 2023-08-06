require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const api = require ('./routes');

// check api key
app.use((req, res, next) => {
  const apiKey = req.get("X-Api-Key");
  if (!apiKey || apiKey !== process.env.API_KEY) {
    res.status(403).send({
      title: "Invalid API key",
      error: "user-microservice-invalid-api-key",
      detail: "Microservices can only be accessed via the API gateway."
    });
  } else next();
});

// all of the routes are implemented here
app.use(api);

// final ditch error catch
app.use((req, res, err) => {
  console.log("How have we got to this and a proper error hasn't been thrown and caught? This is a last resort!")
  console.error(err.stack);
  console.log(err);
  res.status(500).send('Something broke!');
});



const server = app.listen(port, () => {
  console.log(`Users microservice listening on port ${port}`);
});

module.exports = { server, app };
