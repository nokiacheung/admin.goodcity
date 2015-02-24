module.exports = function(app) {
  var express = require('express');
  var authRouter = express.Router();

  authRouter.post('/signup', function(req, res) {
    res.send({"jwt_token":"zdrpfxseg3w2ykvi","message":"Success"});
  });

  authRouter.post('/send_pin', function(req, res) {
    res.send({"jwt_token":"zdrpfxseg3w2ykvi"});
  });

  var users_json = {
    "addresses": [{
      "id": 1,
      "street": null,
      "flat": null,
      "building": null,
      "district_id": null,
      "addressable_type": "User"
    }],
    "districts": [],
    "user_profile": {
      "id": 1,
      "first_name": "Tom",
      "last_name": "Jones",
      "permission_id": null
    }
  };

  authRouter.post('/verify', function(req, res){
    res.send({"user": users_json ,"jwt_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0MDkwNDA0MTQsImlzcyI6Ikdvb2RDaXR5SEsiLCJleHAiOjE0MTAyNTAwMTQsIm1vYmlsZSI6Iis4NTI2MTA5MjAwMSIsIm90cF9zZWNyZXRfa2V5IjoiemRycGZ4c2VnM3cyeWt2aSJ9.0nokBv047aUR-xcilAOwudkkHyQem47L7vYiO6irvKE"});
  });

  authRouter.get('/current_user_profile', function(req, res){
    if (req.header("Authorization").indexOf('pas89df7asjknf') != -1) {
      users_json.user_profile.permission_id = 2;
      users_json.user_profile.id = 3;
    }
    else if (req.header("Authorization").indexOf('7sakjhf8s6dasd') != -1) {
      users_json.user_profile.permission_id = 1;
      users_json.user_profile.id = 2;
    }
    else {
      users_json.user_profile.permission_id = null;
      users_json.user_profile.id = 1;
    }

    res.send(users_json);
  });

  app.use('/api/v1/auth/', authRouter);
};
