import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, testHelper,
  TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

module('offers', {
  setup: function() {
    App = startApp({}, 2);
    testHelper = TestHelper.setup(App);
  },
  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("redirect to offers page", function() {
  visit("/offers");

  andThen(function(){
    equal(currentURL(), "/offers/submitted");
    equal(find("ul.list li").length, 1);
    equal(find("ul.list img").length, 1);
  });
});

test("display submitted offer", function() {
  visit("/offers");

  andThen(function(){
    equal(currentURL(), "/offers/submitted");
    click("ul.list li:first a");
    andThen(function() {
      equal(currentURL(), "/offers/3/review_offer/items");
      equal(find("a:contains('Start Review')").length, 1);
    });
  });
});

test("offers under review: redirect to in review offer page", function() {
  visit("/offers/in_progress");
  andThen(function(){
    equal(currentURL(), "/offers/in_progress/reviewing");
    equal(find("ul.list li").length, 1);
    equal(find("ul.list img").length, 1);
  });
});
