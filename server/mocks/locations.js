module.exports = function(app) {
  var express = require('express');
  var locationsRouter = express.Router();
  locationsRouter.get('/', function(req, res) {
    res.send({
      "locations": [{ "id": 1, "building": "building124", "area": "area124" },{"id": 4,"building": "building123", "area": "area123"}]
    });
  });
  app.use('/api/v1/locations', locationsRouter);
};
