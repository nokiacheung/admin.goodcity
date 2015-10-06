import Ember from 'ember';
import startApp from '../helpers/start-app';
import testSkip from '../helpers/test-skip';

var App;

module('Authorization', {
  setup: function() {
    App = startApp({}, 1);
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

testSkip("On restricted page doesn't redirect if staff", function() {
  visit('/offers');

  andThen(function() {
    equal(currentURL(), '/offers/submitted');
  });
});
