module.exports = function(app) {
  var express      = require('express');
  var deliveriesRouter = express.Router();

  deliveriesRouter.delete("/:id", function(req, res) {
    res.send({});
  });

  app.use("/api/v1/deliveries/:id", deliveriesRouter);
  app.use("/api/v1/deliveries", deliveriesRouter);

};
