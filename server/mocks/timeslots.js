module.exports = function(app) {
  var express = require('express');
  var timeslotsRouter = express.Router();
  timeslotsRouter.get('/', function(req, res) {
    res.send({
      "timeslots": [{ "id": 1, "name": "9 AM - 11 AM" },{"id": 2,"name": "11 AM - 1 PM"},{"id": 3,"name": "2 PM - 4 PM"}]
    });
  });
  app.use('/api/v1/timeslots', timeslotsRouter);
};
