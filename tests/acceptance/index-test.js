import Ember from 'ember';
import startApp from '../helpers/start-app';
import testSkip from '../helpers/test-skip';

var App;

module('Home Page', {
  setup: function() {
    App = startApp({}, 1);
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

testSkip("redirect to offers page if logged-in as Reviewer", function() {
  App = startApp({}, 1);
  visit("/");

  andThen(function(){
    equal(currentURL(), "/offers/my_list/reviewing");
  });
});

testSkip("redirect to offers page if logged-in as Supervisor", function() {
  App = startApp({}, 2);
  visit("/");

  andThen(function(){
    equal(currentURL(), "/offers/submitted");
  });
});

test("redirect to login page if try to visit home page", function() {
  App = startApp();
  lookup('service:session').set('authToken', null);

  visit("/");

  andThen(function(){
    equal(currentURL(), "/login");
  });
});
