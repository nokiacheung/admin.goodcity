module.exports = function(app) {
  var express = require('express');
  var gogovanOrdersRouter = express.Router();
  gogovanOrdersRouter.post('/calculate_price', function(req, res) {
    res.send({ "base" : 120 });
  });

  app.use('/api/v1/gogovan_orders', gogovanOrdersRouter);
};
