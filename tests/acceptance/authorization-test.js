import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

module('Authorization', {
  beforeEach: function() {
    App = startApp({}, 1);
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test("On restricted page doesn't redirect if staff", function() {
  visit('/offers');

  andThen(function() {
    equal(currentURL(), '/offers/submitted');
  });
});
