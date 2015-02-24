import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, testHelper,
  TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

module('Offer Index View', {
  setup: function() {
    App = startApp({}, 1);
    testHelper = TestHelper.setup(App);
  },
  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test('Offers list & link to add items', function() {
  expect(2);

  visit('/offers');

  andThen(function() {
    // display offers that have at least 1 items
    equal(find('.list-items li').length, 3);

    // test: link to complete offers
    equal(find("a:contains('Complete this Offer')").length, 1);
  });
});

test("Offers Details", function() {
  expect(4);

  visit('/offers');

  andThen(function() {
    equal(find('.list-items li').length, 3);
    var offer_detail = find('.list-items li').first().text();
    var offer_detail_text = $.trim(offer_detail.replace(/\s+/g, " "));

    // test: offer details
    equal(offer_detail_text, "Complete this Offer");

    // test: complete this offer link
    var complete_offer_link = find('.list-items li').first().find('a');
    equal(complete_offer_link.attr('href'), "/offers/1/offer_details");
    equal($.trim(complete_offer_link.text()), "Complete this Offer");
  });
});
