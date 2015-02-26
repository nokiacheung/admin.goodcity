import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

module('Authorization', {
  setup: function() {

  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test("On restricted page doesn't redirect if staff", function() {
  App = startApp({}, 1);

  visit('/inbox');

  andThen(function() {
    equal(currentURL(), '/inbox');
  });
});
