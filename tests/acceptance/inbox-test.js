import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, testHelper,
  TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

module('Inbox', {
  setup: function() {
    App = startApp({}, 2);
    testHelper = TestHelper.setup(App);
  },
  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("redirect to inbox page", function() {
  visit("/inbox");

  andThen(function(){
    equal(currentURL(), "/inbox");
    equal(find("ul.list li").length, 1);
    equal(find("ul.list img").length, 1);
  });
});

test("display submiited offer", function() {
  visit("/inbox");

  andThen(function(){
    equal(currentURL(), "/inbox");
    click("ul.list li:first a");
    andThen(function() {
      equal(currentURL(), "/offers/3/review_offer/items");
      equal(find("a:contains('Start Review')").length, 1);
    });
  });
});
