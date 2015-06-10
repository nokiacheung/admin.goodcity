module.exports = function(app) {
  var express = require('express');
  var gogovanTransportsRouter = express.Router();
  gogovanTransportsRouter.get('/', function(req, res) {
    res.send({
      "gogovan_transports": [{ "id": 1, "name": "Van" },{"id": 2,"name": "5.5 Tonne Truck"}, {"id": 3,"name": "Disable"}, {"id": 4,"name": "9 Tonne Truck"}]
    });
  });
  app.use('/api/v1/gogovan_transports', gogovanTransportsRouter);
};
