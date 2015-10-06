import Ember from 'ember';
import startApp from '../helpers/start-app';
import FactoryGuy from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import testSkip from '../helpers/test-skip';

var App, offer, item;

module('Closed Offer', {
  setup: function() {
    App = startApp({}, 2);
    TestHelper.setup();
    offer = FactoryGuy.make("offer", { state: "closed" });
    item = FactoryGuy.make("item", { state: "rejected", offer: offer });
  },
  teardown: function() {
    Em.run(function() { TestHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

testSkip("display closed offer with rejected items", function() {
  visit("/offers/" + offer.id + "/review_offer/items");

  andThen(function(){
    equal(currentURL(), "/offers/" + offer.id + "/review_offer/items");
    equal(find(".reject_badge").length, 1);
  });
});

testSkip("display logistics tab of closed offer", function() {
  visit("/offers/" + offer.id + "/review_offer/logistics");

  andThen(function(){
    equal(currentURL(), "/offers/" + offer.id + "/review_offer/logistics");

    var logistics_text = $.trim($('.noTransportItems').text().replace(/\s+/g, " "));
    equal(logistics_text, "No items to transport. This offer is closed now.");
  });
});
