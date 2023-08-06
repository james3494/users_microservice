
module.exports = {
  buildMakeExpressCallback({ catchError }) {
    return  function (controller) {
      return (req, res) => {
        const httpRequest = {
          body: req.body,
          query: req.query,
          params: req.params,
          ip: req.ip,
          method: req.method,
          path: req.path,
          headers: {
            'Content-Type': req.get('Content-Type'),
            Referer: req.get('referer'),
            'User-Agent': req.get('User-Agent'),
            Authorization: req.get('Authorization')
          }
        };

        const dealWithResponse = (httpResponse) => {
          if (httpResponse.headers)
           res.set(httpResponse.headers);

          res.type('json');
          res.status(httpResponse.status).send(httpResponse.body);
        }

        controller(httpRequest)
          .then(dealWithResponse)
          .catch((err) => dealWithResponse(catchError(err)));
      };
    }
  }

};
