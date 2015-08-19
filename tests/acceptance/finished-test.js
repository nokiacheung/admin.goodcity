import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

module('Finished Offers', {
  setup: function() {
    App = startApp({}, 2);
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test("redirect to finished offers page", function() {
  visit("/offers/finished");

  andThen(function(){
    equal(currentURL(), "/offers/finished/received");
    equal(find("ul.list li").length, 1);
    equal(find("ul.list img").length, 1);

    // under-review status
    equal($('.time_indicator').text().indexOf('Received by ') > 0, true);
    var itemStatus = $('li.inbox_page:first span.info div:last').text().replace(/\s{1,}/g,' ');

    // items accept-reject status
    equal(itemStatus, " 1 Received, 0 missing, 0 rejected ");
  });
});

test("redirect to cancelled offers page", function() {
  visit("/offers/finished/cancelled");

  andThen(function(){
    equal(currentURL(), "/offers/finished/cancelled");
    equal(find("ul.list li").length, 1);
    equal(find("ul.list img").length, 1);

    // cancelled status
    equal($('.time_indicator').text().indexOf('Closed') > 0, true);

    // items accept-reject status
     var itemStatus = $('li.inbox_page:first span.info div:last').text().replace(/\s{1,}/g,' ');
    equal(itemStatus, " 0 Accepted, 1 rejected, 0 pending ");
  });
});
