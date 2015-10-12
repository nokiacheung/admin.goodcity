import Ember from 'ember';
import startApp from '../helpers/start-app';
import FactoryGuy from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';

var App, offer1, item1, package1, package2, package3;

module('Received Offers', {
  setup: function() {
    App = startApp({}, 2);
    TestHelper.setup();
    item1 = FactoryGuy.make("item", {state: "accepted"});
    offer1 = FactoryGuy.make("offer", { state: "received", items: [item1] });
    package1 = FactoryGuy.make("package", { offerId: parseInt(offer1.id), state: "received", item: item1});
    package2 = FactoryGuy.make("package", { offerId: parseInt(offer1.id), state: "expecting", item: item1});
    package3 = FactoryGuy.make("package", { offerId: parseInt(offer1.id), state: "missing", item: item1});

  },
  teardown: function() {
    Em.run(function() { TestHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("expecting, received and missing count", function() {
  visit("/offers/"+offer1.id+"/review_offer/receive");

  andThen(function(){
    //expecting
    var href = "/offers/"+offer1.id+"/review_offer/receive";
    equal($('a[href="'+href+'"]:last').text().trim(), "Expecting(1)");
    //received
    var href1 = href +"?state=received";
    equal($('a[href="'+href1+'"]:last').text().trim(), "Received(1)");
    //missing
    href1 = href +"?state=missing";
    equal($('a[href="'+href1+'"]').text().trim(), "Missing(1)");
  });
});
