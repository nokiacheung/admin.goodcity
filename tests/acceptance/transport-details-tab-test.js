import Ember from 'ember';
import startApp from '../helpers/start-app';
import syncDataStub from '../helpers/empty-sync-data-stub';

var TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);
var App, testHelper, offer1, item1, offer2, item2, offer3, item3, offer4,
  item4, delivery;

module('Display Transport Details', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);
    syncDataStub(testHelper);

    offer1 = FactoryGuy.make("offer", {state:"submitted"});
    item1  = FactoryGuy.make("item", {state:"submitted", offer: offer1});
    offer2 = FactoryGuy.make("offer", {state:"under_review"});
    item2  = FactoryGuy.make("item", {state:"accepted", offer: offer2});
    offer3 = FactoryGuy.make("offer", {state:"reviewed"});
    item3  = FactoryGuy.make("item", {state:"accepted", offer: offer3});
    delivery = FactoryGuy.make("delivery", {deliveryType: "Alternate"});
    offer4 = FactoryGuy.make("offer", {state:"scheduled"});
    item4  = FactoryGuy.make("item", {state:"accepted", offer: offer4});
  },

  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("for submitted offer", function() {
  visit('/offers/' + offer1.id + "/transport_details");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer1.id + "/transport_details");
    equal($.trim($('.wait_transport').text()), "Transport arrangements can be made once the review is complete.");
  });
});

test("for under review offer", function() {
  visit('/offers/' + offer2.id + "/transport_details");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer2.id + "/transport_details");
    equal($.trim($('.wait_transport').text()), "Transport arrangements can be made once the review is complete.");
    equal($.trim($('.transport-content .row:first').text()), "Items accepted so far (1)");
    equal($(".items_list img").length, 1);
  });
});

test("for reviewed offer", function() {
  visit('/offers/' + offer3.id + "/transport_details");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer3.id + "/transport_details");
    equal($('.transport-content .row:first a').text(), "Arrange Transport");
    equal($('.transport-content .row:first a').attr('href'), "/offers/"+ offer3.id +"/plan_delivery");
    equal($.trim($('.transport-content .row:eq(1)').text()), "Accepted items to be transported");
    equal($(".items_list img").length, 1);
  });
});

test("for scheduled offer", function() {
  visit('/offers/' + offer4.id + "/transport_details");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer4.id + "/transport_details");

    equal($.trim($('.transport-content .row:eq(1)').text()), "Accepted items to be transported");
    equal($(".items_list img").length, 1);
    equal($('.transport-buttons a').length, 2);
  });
});
