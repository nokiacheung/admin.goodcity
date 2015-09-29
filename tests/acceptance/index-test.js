import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

module('Home Page', {
  setup: function() {
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test("redirect to offers page if logged-in as Reviewer", function() {
  App = startApp({}, 1);
  visit("/");

  andThen(function(){
    equal(currentURL(), "/offers/my_list/reviewing");
  });
});

test("redirect to offers page if logged-in as Supervisor", function() {
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
