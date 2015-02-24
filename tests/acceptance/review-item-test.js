import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, testHelper,
  TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

module('Display review Item', {
  setup: function() {
    App = startApp({}, 2);
    testHelper = TestHelper.setup(App);
  },
  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("Display Item under review", function() {
  expect(6);
  visit("/offers/1/review_item/4");

  andThen(function(){
    equal(currentURL(), "/offers/1/review_item/4/accept");
    equal(/Review Item:/i.test($('body').text()), true);
    equal(/Velit fugit amet quos ut minima quis/i.test($('body').text()), true);
    equal(/Condition: New/i.test($('body').text()), true);
    equal(find('.select2-chosen').text(), "Add item label");
    equal(find("img.thumb").length, 1);
  });
});

test("Back button redirects to review offer page", function() {
  expect(1);
  visit("/offers/1/review_item/4");
  click("a:contains('Back')");

  andThen(function() {
    equal(currentURL(), "/offers/1/review_offer/items");
  });
});
