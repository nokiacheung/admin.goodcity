module.exports = function(app) {
  var express = require('express');
  var crossroadsTransportsRouter = express.Router();
  crossroadsTransportsRouter.get('/', function(req, res) {
    res.send({
      "crossroads_transports": [
        {"id": 1,"name": "1/8 Truck"},
        {"id": 2,"name": "2/8 Truck"},
        {"id": 3,"name": "3/8 Truck"},
        {"id": 4,"name": "4/8 Truck"},
        {"id": 5,"name": "5/8 Truck"},
        {"id": 6,"name": "6/8 Truck"},
        {"id": 7,"name": "7/8 Truck"},
        {"id": 8,"name": "8/8 Truck"}
      ]
    });
  });
  app.use('/api/v1/crossroads_transports', crossroadsTransportsRouter);
};
