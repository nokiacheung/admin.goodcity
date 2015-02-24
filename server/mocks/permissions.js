module.exports = function(app) {
  var express = require('express');
  var permissionsRouter = express.Router();

  var permissions_json = {
    "permissions": [
      { "id": 1, "name": "Reviewer" },
      { "id": 2, "name": "Supervisor" }
    ]
  };

  permissionsRouter.get('/', function(req, res) {
    res.send(permissions_json);
  });

  app.use('/api/v1/permissions', permissionsRouter);
};
