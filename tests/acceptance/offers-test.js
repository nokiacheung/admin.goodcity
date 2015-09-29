import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

module('Submitted Offers', {
  setup: function() {
    App = startApp({}, 2);
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test("redirect to offers page", function() {
  visit("/offers");

  andThen(function(){
    equal(currentURL(), "/offers/submitted");
    equal(find("ul.list li").length, 1);
    equal(find("ul.list img").length, 1);

    // submitted status
    equal($('.time_indicator').text().indexOf('Submitted') > 0, true);
    var itemStatus = $('li.inbox_page:first span.info div:last').text().replace(/\s{1,}/g,' ');

    // items accept-reject status
    equal(itemStatus, " 0 Accepted, 0 rejected, 1 pending ");
  });
});

test("display submitted offer", function() {
  visit("/offers");

  andThen(function(){
    equal(currentURL(), "/offers/submitted");
    click("ul.list li:first a");
    andThen(function() {
      equal(currentURL(), "/offers/3/review_offer/items");
      equal(find("a:contains('Start Review')").length, 1);
    });
  });
});
