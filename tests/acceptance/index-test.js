import Ember from 'ember';
import startApp from '../helpers/start-app';
import syncDataStub from '../helpers/empty-sync-data-stub';

var TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);
var App, testHelper;

module('Home Page', {
  setup: function() {
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test("Display tour and register links", function() {
  App = startApp();
  lookup('session:current').set('authToken', null);

  visit("/");

  andThen(function(){
    equal(currentURL(), "/");
    equal($("a[href='/tour']").length, 1);
    equal($("a[href='/register']").length, 1);
  });
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
