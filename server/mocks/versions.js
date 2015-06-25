module.exports = function(app) {
  var express = require('express');
  var versionsRouter = express.Router();

  var versions_json = {
    "versions": [
      { "id": 1, "event": "create", "item_type": "Item", "item_id": "1"  },
      { "id": 2, "event": "update", "item_type": "Item", "item_id": "1"  }
    ]
  };

  versionsRouter.get('/', function(req, res) {
    res.send(versions_json);
  });

  app.use('/api/v1/versions', versionsRouter);
};
