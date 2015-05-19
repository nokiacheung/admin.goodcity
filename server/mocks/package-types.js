module.exports = function(app) {
  var express = require('express');
  var packageTypesRouter = express.Router();
  packageTypesRouter.get('/', function(req, res) {
    res.send({ "package_types":
     [{ "id":1,"name":"Bed - Baby crib","code":"BBC" },
     { "id":2,"name":"Bed - Baby mattress","code":"BBM" },
     { "id":3,"name":"Bed - Baby's crib with mattress","code":"BBS" },
     { "id":4,"name":"Bed - child's base","code":"BCB" },
     { "id":5,"name":"Bed - Childs Mattress","code":"BCM" }]
    });
  });
  app.use('/api/v1/package_types', packageTypesRouter);
};
