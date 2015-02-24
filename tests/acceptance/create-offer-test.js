import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, testHelper,
  TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

module('Create New Offer', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);
  },
  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("should create new offer", function() {
  expect(3);

  visit("/offers/new");

  andThen(function() {
    // test: created new offer and redirected to its show page.
    equal(currentURL(), '/offers/3');

    //test: item count zero
    equal($.trim(find('.tab-bar-section .title').text()), "Offer items (0)");

    //test: no items message
    equal($.trim($('.no-items').text()), "You don't have any items in this offer yet. Please add your first item!");
  });
});

test("should redirect to previous empty offer", function() {
  expect(4);

  visit("/offers");

  andThen(function() {
    equal(currentURL(), '/offers');

    click("a:contains('Make a New Donation')");

    andThen(function(){
      equal(currentURL(), '/offers/2');

      //test: item count zero
      equal($.trim(find('.tab-bar-section .title').text()), "Offer items (0)");

      //test: no items message
      equal($.trim(find('.no-items').text()), "You don't have any items in this offer yet. Please add your first item!");
    });
  });
});
