module.exports = function(app) {
  var express = require('express');
  var holidaysRouter = express.Router();

  var holidays_json = {
    "holidays":[
    {"id":44,"holiday":"2016-05-13 16:00:00","name":"test holiday","year":2016},
    {"id":41,"holiday":"2016-05-30 18:30:00","name":"test holiday cool","year":2016},
    {"id":45,"holiday":"2017-01-12 18:30:00","name":"next year holiday","year":2017},
    {"id":46,"holiday":"2017-05-10 18:30:00","name":"test holiday check","year":2017}
    ]
  };

  holidaysRouter.get('/', function(req, res) {
    res.send(holidays_json);
  });

  app.use('/api/v1/holidays', holidaysRouter);
};
