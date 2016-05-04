import Ember from 'ember';
import startApp from '../helpers/start-app';
import FactoryGuy from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import '../helpers/custom-helpers';

var App, reviewer, offer1, item1, offer2;

module('Finished Offers', {
  beforeEach: function() {
    App = startApp({}, 2);
    TestHelper.setup();
    reviewer = FactoryGuy.make('user', { id: 3 });

    offer1 = FactoryGuy.make("offer", {state:"closed", reviewedBy: reviewer});
    item1 = FactoryGuy.make("item", { state:"rejected", offer: offer1 });

    offer2 = FactoryGuy.make("offer", {state:"received", reviewedBy: reviewer});
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test("redirect to finished offers page", function() {
  visit("/offers/finished");

  andThen(function(){

    var assertions = function() {
      equal(currentURL(), "/offers/finished/received");
      equal(find("ul.list li").length, 2);
      equal(find("ul.list img").length, 1);

      // under-review status
      equal($('.time_indicator').text().indexOf('Received by ') > 0, true);
      var itemStatus = $('li.inbox_page:first span.info div:last').text().replace(/\s{1,}/g,' ');

      // items accept-reject status
      equal(itemStatus, " 0 Received, 0 missing, 0 rejected ");
    };

    runloopFix(assertions);
  });
});

test("redirect to cancelled offers page", function() {
  visit("/offers/finished/cancelled");

  andThen(function(){
    equal(currentURL(), "/offers/finished/cancelled");
    equal(find("ul.list li").length, 2);
    equal(find("ul.list img").length, 1);

    // cancelled status
    equal($('.time_indicator').text().indexOf('Closed') > 0, true);

    // items accept-reject status
     var itemStatus = $('li.inbox_page:first span.info div:last').text().replace(/\s{1,}/g,' ');
    equal(itemStatus, " 0 Accepted, 1 rejected, 0 pending ");
  });
});
