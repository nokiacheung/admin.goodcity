module.exports = function(app) {
  var express = require('express');
  var twilioRouter = express.Router();

  twilioRouter.get('/generate_call_token', function(req, res) {
    res.send({"token":"zdrpfxseg3w2ykvi"});
  });

  app.use('/api/v1/twilio_outbound/', twilioRouter);
};
