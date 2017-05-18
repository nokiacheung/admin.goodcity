import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var App;

module('Home Page', {
  beforeEach: function() {
    App = startApp({}, 1);
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test("redirect to offers page if logged-in as Reviewer", function(assert) {
  assert.expect(1);
  App = startApp({}, 1);
  visit("/");

  andThen(function(){
    assert.equal(currentURL(), "/offers/my_list/reviewing");
  });
});

test("redirect to offers page if logged-in as Supervisor", function(assert) {
  assert.expect(1);
  App = startApp({}, 2);
  visit("/");

  andThen(function(){
    assert.equal(currentURL(), "/offers/submitted");
  });
});

test("redirect to login page if try to visit home page", function(assert) {
  assert.expect(1);
  App = startApp();
  lookup('service:session').set('authToken', null);

  visit("/");

  andThen(function(){
    assert.equal(currentURL(), "/login");
  });
});
