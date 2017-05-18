import Ember from 'ember';
import { module, test } from 'qunit';
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

test("On restricted page doesn't redirect if staff", function(assert) {
  assert.expect(1);
  visit('/offers');

  andThen(function() {
    assert.equal(currentURL(), '/offers/submitted');
  });
});
