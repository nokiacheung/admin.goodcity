module.exports = function(app) {
  var express = require('express');
  var imagesRouter = express.Router();

  imagesRouter.get('/', function(req, res) {
    res.send({images:[]});
  });

  imagesRouter.get('/generate_signature', function(req, res) {
    res.send({
      "api_key":   "926849638736153",
      "callback":  "/public/cloudinary_cors.html",
      "signature": "0ff551d3b047a18ff4c28fe0f95b0b39ad344474",
      "timestamp": 1407854176
    });
  });

  app.use('/api/v1/images/', imagesRouter);
  // app.use('/api/v1/images/generate_signature', imagesRouter);
};
