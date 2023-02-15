
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
        cookies: getCookieObj (req),
        headers: {
          'Content-Type': req.get('Content-Type'),
          Referer: req.get('referer'),
          'User-Agent': req.get('User-Agent'),
          Cookie : req.get('Cookie'),
        }
      };

      controller(httpRequest)
        .then(httpResponse => {
          if (httpResponse.headers) {
            res.set(httpResponse.headers);
          }
          res.type('json');
          res.status(httpResponse.statusCode).send(httpResponse.body);
        })
        .catch(() => res.status(500).send({ error: 'An unknown error occurred.' }));


      function getCookieObj (req) {
        let cookiesObj = {};
        const cookieStr = req.get('Cookie');
        if (cookieStr) {
          const cookies = cookieStr.split(';');
          cookies.forEach((cookie) => {
            const split = cookie.split('=');
            cookiesObj[ split[0] ] = split[1];
          });
        }

        return cookiesObj;
      }
    };
  }
};
