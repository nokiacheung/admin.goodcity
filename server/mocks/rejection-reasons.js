module.exports = function(app) {
  var express = require('express');
  var rejectionReasonsRouter = express.Router();

  var reasons_json = {
    "rejection_reasons": [
      {"id":1,"name":"Quality"},
      {"id":2,"name":"Size"},
      {"id":3,"name":"Other"}
    ]
  };

  rejectionReasonsRouter.get('/', function(req, res) {
    res.send(reasons_json);
  });

  app.use('/api/v1/rejection_reasons', rejectionReasonsRouter);
};
