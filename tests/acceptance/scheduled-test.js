import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, testHelper, offer1, delivery1, offer2, delivery2, offer3,
  delivery3, schedule4, offer4, delivery4,
  TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

module('Scheduled Offers', {
  setup: function() {
    App = startApp({}, 2);
    testHelper = TestHelper.setup(App);

    delivery1 = FactoryGuy.make('delivery', {deliveryType: "Gogovan"});
    offer1 = FactoryGuy.make("offer_with_items", { state: "scheduled", delivery: delivery1 });

    schedule4 = FactoryGuy.make('schedule', {
      scheduledAt: (new Date(new Date().setDate(new Date().getDate()+15)))});
    delivery4 = FactoryGuy.make('delivery', {deliveryType: "Gogovan", schedule: schedule4 });
    offer4 = FactoryGuy.make("offer_with_items", { state: "scheduled", delivery: delivery4 });

    delivery2 = FactoryGuy.make('delivery', {deliveryType: "Alternate"});
    offer2 = FactoryGuy.make("offer_with_items", { state: "scheduled", delivery: delivery2 });

    delivery3 = FactoryGuy.make('delivery', {deliveryType: "Drop Off"});
    offer3 = FactoryGuy.make("offer_with_items", { state: "scheduled", delivery: delivery3 });
  },
  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("redirect to reviewing offers page", function() {
  visit("/offers/scheduled");

  andThen(function(){
    equal(currentURL(), "/offers/scheduled/collection");
    equal(find("ul.list li").length, 1);
    equal(find("ul.list img").length, 1);
    equal($('.time_indicator').text().indexOf('Collection') > 0, true);
  });
});

test("redirect to reviewed offers page", function() {
  visit("/offers/scheduled/gogovan");

  andThen(function(){
    equal(currentURL(), "/offers/scheduled/gogovan");
    equal(find("ul.list li").length, 1);
    equal(find("ul.list img").length, 1);
    equal($('.time_indicator').text().indexOf('Van ordered') > 0, true);
  });
});

test("apply filter at gogovan scheduled offers", function() {
  visit("/offers/scheduled/gogovan");

  andThen(function(){
    equal(currentURL(), "/offers/scheduled/gogovan");

    var option = find('.dynamic_filter select option:contains("After next week (1)")').val();
    $('.dynamic_filter select').val(option);

    andThen(function(){
      equal(find('.dynamic_filter select :selected').text(), "After next week (1)");
      equal(find("ul.list li").length, 1);
      equal(find("ul.list img").length, 1);
      equal($('.time_indicator').text().indexOf('Van ordered') > 0, true);
    });
  });
});

test("redirect to scheduled offers page", function() {
  visit("/offers/scheduled/other_delivery");

  andThen(function(){
    equal(currentURL(), "/offers/scheduled/other_delivery");
    equal(find("ul.list li").length, 1);
    equal(find("ul.list img").length, 1);
    equal($('.time_indicator').text().indexOf('Drop-off') > 0, true);
  });
});
