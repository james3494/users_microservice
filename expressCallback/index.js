
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
            "X-Current-User": req.get("X-Current-User")
          }
        };

        controller(httpRequest)
          .then((httpResponse) => {
            if (httpResponse.headers) res.set(httpResponse.headers);
            res.set('Content-Type', 'application/json');
            res.status(httpResponse.status).send(httpResponse.body);
          })
          .catch(err => catchError(res, err));
      };
    }
  }

};
