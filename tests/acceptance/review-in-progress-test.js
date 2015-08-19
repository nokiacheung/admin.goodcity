import Ember from 'ember';
import startApp from '../helpers/start-app';
import FactoryGuy from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';

var App, offer1, reviewer, reviewerName, offer2, item1, item2;

module('In Review Offers', {
  setup: function() {
    App = startApp({}, 2);
    TestHelper.setup();
    reviewer = FactoryGuy.make('user', { id: 3 });
    offer1 = FactoryGuy.make("offer_with_items", { state:"under_review", reviewedBy: reviewer});
    reviewerName = reviewer.get('firstName') + " " + reviewer.get('lastName');

    offer2 = FactoryGuy.make("offer",{state:"reviewed", reviewedBy: reviewer});
    item1 = FactoryGuy.make("item", { state:"accepted", offer: offer2 });
    item2 = FactoryGuy.make("item", { state:"rejected", offer: offer2 });
  },
  teardown: function() {
    Em.run(function() { TestHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("redirect to reviewing offers page", function() {
  visit("/offers/in_progress");

  andThen(function(){
    equal(currentURL(), "/offers/in_progress/reviewing");
    equal(find("ul.list li").length, 2);
    equal(find("ul.list img").length, 2);

    // under-review status
    console.log($('.time_indicator').text());
    equal($('.time_indicator').text().indexOf('Started by ') > 0, true);
    var itemStatus = $('li.inbox_page:first span.info div:last').text().replace(/\s{1,}/g,' ');

    // items accept-reject status
    equal(itemStatus, " 0 Accepted, 0 rejected, 2 pending ");
  });
});

test("redirect to reviewed offers page", function() {
  visit("/offers/in_progress/reviewed");

  andThen(function(){
    equal(currentURL(), "/offers/in_progress/reviewed");
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
