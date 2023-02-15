module.exports = {
  catchError: function(e) {
    console.log(e);
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 400,
      body: {
        error: true,
        message: e.message
      }
    };
  }
}
