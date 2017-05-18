import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import '../factories/offer';
import '../factories/item';
import FactoryGuy from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';

var App, offer, item;

module('Closed Offer', {
  beforeEach: function() {
    App = startApp({}, 2);
    TestHelper.setup();
    offer = FactoryGuy.make("offer", { state: "closed" });
    item = FactoryGuy.make("item", { state: "rejected", offer: offer });
  },
  afterEach: function() {
    Em.run(function() { TestHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("display closed offer with rejected items", function(assert) {
  assert.expect(2);
  visit("/offers/" + offer.id + "/review_offer/items");

  andThen(function(){
    assert.equal(currentURL(), "/offers/" + offer.id + "/review_offer/items");
    assert.equal(find(".reject_badge").length, 1);
  });
});

test("display logistics tab of closed offer", function(assert) {
  assert.expect(2);
  visit("/offers/" + offer.id + "/review_offer/logistics");

  andThen(function(){
    assert.equal(currentURL(), "/offers/" + offer.id + "/review_offer/logistics");

    var logistics_text = $.trim($('.noTransportItems').text().replace(/\s+/g, " "));
    assert.equal(logistics_text, "No items to transport. This offer is closed now.");
  });
});
