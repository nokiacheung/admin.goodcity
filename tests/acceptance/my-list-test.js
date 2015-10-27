import Ember from 'ember';
import startApp from '../helpers/start-app';
import FactoryGuy from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';

var App, offer1, reviewer, reviewerName, offer2, item1, item2,
  delivery, offer3, item3, item4, offer4, item5;

module('My Offers', {
  setup: function() {
    App = startApp({}, 2);
    TestHelper.setup();
    reviewer = FactoryGuy.make('user', { id: 3 });
    offer1 = FactoryGuy.make("offer_with_items", { state:"under_review", reviewedBy: reviewer});
    reviewerName = reviewer.get('firstName') + " " + reviewer.get('lastName');

    offer2 = FactoryGuy.make("offer",{state:"reviewed", reviewedBy: reviewer});
    item1 = FactoryGuy.make("item", { state:"accepted", offer: offer2 });
    item2 = FactoryGuy.make("item", { state:"rejected", offer: offer2 });

    delivery = FactoryGuy.make('delivery', {deliveryType: "Gogovan"});
    offer3 = FactoryGuy.make("offer", {state:"scheduled", delivery: delivery, reviewedBy: reviewer});
    item3 = FactoryGuy.make("item", { state:"accepted", offer: offer3 });
    item4 = FactoryGuy.make("item", { state:"rejected", offer: offer3 });

    offer4 = FactoryGuy.make("offer", {state:"closed", reviewedBy: reviewer});
    item5 = FactoryGuy.make("item", { state:"rejected", offer: offer4 });
  },
  teardown: function() {
    Em.run(function() { TestHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("redirect to reviewing offers page", function() {
  visit("/offers/my_list");

  andThen(function(){
    equal(currentURL(), "/offers/my_list/reviewing");
    equal(find("ul.list li").length, 1);
    equal(find("ul.list img").length, 1);

    // under-review status
    equal($('.time_indicator').text().indexOf('Started by ') > 0, true);
    var itemStatus = $('li.inbox_page:first span.info div:last').text().replace(/\s{1,}/g,' ');

    // items accept-reject status
    equal(itemStatus, " 0 Accepted, 0 rejected, 2 pending ");
  });
});

test("redirect to reviewed offers page", function() {
  visit("/offers/my_list/reviewed");

  andThen(function(){
    equal(currentURL(), "/offers/my_list/reviewed");
    equal(find("ul.list li").length, 1);
    equal(find("ul.list img").length, 1);

    // reviewed status
    equal($('.time_indicator').text().indexOf('Reviewed') > 0, true);
    equal($('.time_indicator').text().indexOf('User to plan transport.') > 0, true);

    // items accept-reject status
     var itemStatus = $('li.inbox_page:first span.info div:last').text().replace(/\s{1,}/g,' ');
    equal(itemStatus, " 1 Accepted, 1 rejected, 0 pending ");
  });
});

test("redirect to scheduled offers page", function() {
  visit("/offers/my_list/scheduled");

  andThen(function(){
    equal(currentURL(), "/offers/my_list/scheduled");
    equal(find("ul.list li").length, 1);
    equal(find("ul.list img").length, 1);

    // scheduled status
    equal($('.time_indicator').text().indexOf('Van ordered') >= 0, true);

    // items accept-reject status
     var itemStatus = $('li.inbox_page:first span.info div:last').text().replace(/\s{1,}/g,' ');
    equal(itemStatus, " 1 Accepted, 1 rejected, 0 pending ");
  });
});

test("redirect to finished offers page", function() {
  visit("/offers/my_list/finished");

  andThen(function(){
    equal(currentURL(), "/offers/my_list/finished");
    equal(find("ul.list li").length, 2);
    equal(find("ul.list img").length, 2);

    // reviewed status
    equal($('.time_indicator').text().indexOf('Closed') > 0, true);

    // items accept-reject status
     var itemStatus = $('li.inbox_page:first span.info div:last').text().replace(/\s{1,}/g,' ');
    equal(itemStatus, " 0 Received, 0 missing, 0 rejected ");
  });
});
