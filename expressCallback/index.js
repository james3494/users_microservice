
module.exports = {
  buildMakeExpressCallback({ getCookies }) {
    return  function (controller) {
      return (req, res) => {
        const httpRequest = {
          body: req.body,
          query: req.query,
          params: req.params,
          ip: req.ip,
          method: req.method,
          path: req.path,
          cookies: getCookies(req),
          headers: {
            'Content-Type': req.get('Content-Type'),
            Referer: req.get('referer'),
            'User-Agent': req.get('User-Agent'),
            Authorization: req.get('Authorization')
          }
        };

        controller(httpRequest)
          .then(httpResponse => {
            if (httpResponse.headers)
              res.set(httpResponse.headers);

            res.type('json');
            res.status(httpResponse.statusCode).send(httpResponse.body);
          })
          .catch(() => res.status(500).send({ error: 'An unknown error occurred.' }));
      };
    }
  }

};
