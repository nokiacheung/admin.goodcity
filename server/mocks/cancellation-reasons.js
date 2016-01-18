module.exports = function(app) {
  var express = require('express');
  var cancellationReasonsRouter = express.Router();

  var reasons_json = {
    "cancellation_reasons": [
      {"id":1,"name":"donated else"},
      {"id":2,"name":"bulky"}
    ]
  };

  cancellationReasonsRouter.get('/', function(req, res) {
    res.send(reasons_json);
  });

  app.use('/api/v1/cancellation_reasons', cancellationReasonsRouter);
};
