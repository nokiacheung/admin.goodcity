import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, testHelper, offer, item,
  TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

module('Closed Offer', {
  setup: function() {
    App = startApp({}, 2);
    testHelper = TestHelper.setup(App);
    offer = FactoryGuy.make("offer", { state: "closed" });
    item = FactoryGuy.make("item", { state: "rejected", offer: offer });
  },
  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("display closed offer with rejected items", function() {
  visit("/offers/" + offer.id + "/review_offer/items");

  andThen(function(){
    equal(currentURL(), "/offers/" + offer.id + "/review_offer/items");
    equal(find(".reject_badge").length, 1);
  });
});

test("display logistics tab of closed offer", function() {
  visit("/offers/" + offer.id + "/review_offer/logistics");

  andThen(function(){
    equal(currentURL(), "/offers/" + offer.id + "/review_offer/logistics");

    var logistics_text = $.trim($('.noTransportItems').text().replace(/\s+/g, " "));
    equal(logistics_text, "No items to transport. This offer is closed now.");
  });
});
