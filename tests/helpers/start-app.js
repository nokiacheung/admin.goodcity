import Ember from 'ember';
import Application from '../../app';
import Router from '../../router';
import config from '../../config/environment';
import './custom-helpers';

export default function startApp(attrs, permissionId) {
  //place setting of localStorage variables here so app doesn't cache values from previous tests

  //auth
  if (permissionId === 2) {
    window.localStorage.authToken = '"pas89df7asjknf"';
    window.localStorage.currentUserId = '"3"';
  } else if (permissionId === 1) {
    window.localStorage.authToken = '"7sakjhf8s6dasd"';
    window.localStorage.currentUserId = '"2"';
  } else {
    window.localStorage.authToken = '"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0MDkwMzgzNjUsImlzcyI6Ikdvb2RDaXR5SEsiLCJleHAiOjE0MTAyNDc5NjUsIm1vYmlsZSI6Iis4NTI2MTA5MjAwMSIsIm90cF9zZWNyZXRfa2V5IjoiemRycGZ4c2VnM3cyeWt2aSJ9.lZQaME1oKw7E5cdfks0jG3A_gxlOZ7VfUVG4IMJbc08"';
    window.localStorage.currentUserId = '"1"';
  }

  var App;

  var attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Router.reopen({
    location: 'none'
  });

  Ember.run(function() {
    App = Application.create(attributes);
    App.setupForTesting();
    App.injectTestHelpers();
  });

  window.alert = function(message) { console.log("Alert: " + message); };
  window.confirm = function(message) { console.log("Confirm: " + message); return true; };

  //needed by application controller init
  lookup("controller:subscriptions")._actions.wire = function() {};

  return App;
}
