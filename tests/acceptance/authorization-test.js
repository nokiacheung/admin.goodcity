import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

module('Authorization', {
  setup: function() {
    App = startApp({}, 1);
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test("On restricted page doesn't redirect if staff", function() {
  visit('/offers');

  andThen(function() {
    equal(currentURL(), '/offers/submitted');
  });
});
