import Ember from 'ember';
import startApp from '../helpers/start-app';
import FactoryGuy from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import testSkip from '../helpers/test-skip';

var App, offer1, delivery1, offer2, delivery2, offer3,
  delivery3, schedule4, offer4, delivery4, ggv_order;

module('Scheduled Offers', {
  beforeEach: function() {
    App = startApp({}, 2);
    TestHelper.setup();

    delivery1 = FactoryGuy.make('delivery', {deliveryType: "Gogovan"});
    offer1 = FactoryGuy.make("offer_with_items", { state: "scheduled", delivery: delivery1 });

    ggv_order = FactoryGuy.make("gogovan_order", {status: "pending"});
    schedule4 = FactoryGuy.make('schedule', {
      scheduledAt: (new Date(new Date().setDate(new Date().getDate()+30)))});
    delivery4 = FactoryGuy.make('delivery', {deliveryType: "Gogovan", schedule: schedule4, gogovanOrder: ggv_order });
    offer4 = FactoryGuy.make("offer_with_items", { state: "scheduled", delivery: delivery4 });

    delivery2 = FactoryGuy.make('delivery', {deliveryType: "Alternate"});
    offer2 = FactoryGuy.make("offer_with_items", { state: "scheduled", delivery: delivery2 });

    delivery3 = FactoryGuy.make('delivery', {deliveryType: "Drop Off"});
    offer3 = FactoryGuy.make("offer_with_items", { state: "scheduled", delivery: delivery3 });
  },
  afterEach: function() {
    Em.run(function() { TestHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

testSkip("viewing collection schedule", function() {
  visit("/offers/scheduled");

  andThen(function(){
    equal(currentURL(), "/offers/scheduled/collection");
    equal(find("ul.list li").length, 1);
    equal(find("ul.list img").length, 1);
    equal($('.time_indicator').text().indexOf('Collection') > 0, true);
    equal($.trim(find('.dynamic_filter select option').first().text()), "All offers (1)");
  });
});

testSkip("viewing gogovan delivery schedule", function() {
  visit("/offers/scheduled/gogovan");

  andThen(function(){
    equal(currentURL(), "/offers/scheduled/gogovan");
    equal(find("ul.list li").length, 2);
    equal(find("ul.list img").length, 2);
    equal($('.time_indicator').text().indexOf('Van ordered') > 0, true);
  });
});

testSkip("filtering gogovan delivery schedule", function() {
  visit("/offers/scheduled/gogovan");

  andThen(function(){
    equal(currentURL(), "/offers/scheduled/gogovan");

    var option = find('.dynamic_filter select option:contains("After next week (1)")').val();
    $('.dynamic_filter select').val(option).change();

    andThen(function(){
      equal($.trim(find('.dynamic_filter select :selected').text()), "After next week (1)");
      equal(find("ul.list li").length, 1);
      equal(find("ul.list img").length, 1);
      equal($('.time_indicator').text().indexOf('Van ordered') > 0, true);
    });
  });
});

testSkip("viewing other delivery schedule", function() {
  visit("/offers/scheduled/other_delivery");

  andThen(function(){
    equal(currentURL(), "/offers/scheduled/other_delivery");
    equal(find("ul.list li").length, 1);
    equal(find("ul.list img").length, 1);
    equal($('.time_indicator').text().indexOf('Drop-off') > 0, true);
  });
});
