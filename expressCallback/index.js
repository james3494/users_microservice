
module.exports = {
  makeExpressCallback (controller) {
    return (req, res) => {
      const httpRequest = {
        body: req.body,
        query: req.query,
        params: req.params,
        ip: req.ip,
        method: req.method,
        path: req.path,
        cookies: req.cookies,
        headers: {
          'Content-Type': req.get('Content-Type'),
          Referer: req.get('referer'),
          'User-Agent': req.get('User-Agent'),
          user: req.get('user')
        }
      };

      controller(httpRequest)
        .then(httpResponse => {
          if (httpResponse.headers)
            res.set(httpResponse.headers);
          // 
          // if (httpResponse.setCookies)
          //   httpResponse.setCookies(res);

          res.type('json');
          res.status(httpResponse.statusCode).send(httpResponse.body);
        })
        .catch(() => res.status(500).send({ error: 'An unknown error occurred.' }));
    };
  }
};
