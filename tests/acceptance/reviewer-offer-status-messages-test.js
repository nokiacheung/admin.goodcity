import Ember from 'ember';
import startApp from '../helpers/start-app';
import syncDataStub from '../helpers/empty-sync-data-stub';

var TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);
var App, testHelper, offer1, offer2, reviewer, reviewer1, reviewerName,
  offer7, offer3, offer4, delivery1, delivery2, offer5, delivery3, offer6,
  offer8, item8, offer9, item9, offer10;

module('Reviewer: Display Offer Status', {
  setup: function() {
    App = startApp({}, 2);
    testHelper = TestHelper.setup(App);

    reviewer = FactoryGuy.make("user");
    offer1 = FactoryGuy.make("offer_with_items", {state:"submitted"});

    offer2 = FactoryGuy.make("offer_with_items", {state:"under_review", reviewedBy: reviewer});
    reviewerName = reviewer.get("firstName") + " " + reviewer.get("lastName");

    offer3 = FactoryGuy.make("offer_with_items", {state:"reviewed"});

    delivery1 = FactoryGuy.make('delivery', {deliveryType: "Alternate"});
    offer4 = FactoryGuy.make("offer_with_items", {state:"scheduled", delivery: delivery1});

    delivery2 = FactoryGuy.make('delivery', {deliveryType: "Gogovan"});
    offer5 = FactoryGuy.make("offer_with_items", {state:"scheduled", delivery: delivery2});

    delivery3 = FactoryGuy.make('delivery', {deliveryType: "Drop Off"});
    offer6 = FactoryGuy.make("offer_with_items", {state:"scheduled", delivery: delivery3});

    offer7 = FactoryGuy.make("offer_with_items", { state:"closed", reviewedBy: reviewer });

    offer8 = FactoryGuy.make("offer", { state:"under_review" });
    item8 = FactoryGuy.make("item", { state: "rejected", offer: offer8 });

    offer9 = FactoryGuy.make("offer", { state:"under_review" });
    item9 = FactoryGuy.make("item", { state: "accepted", offer: offer9 });

    offer10 = FactoryGuy.make("offer_with_items", { state:"received" });
  },

  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("Display offer status for submitted offer", function() {
  visit('/offers/' + offer1.id + "/review_offer/items");

  andThen(function() {
    equal(currentURL(), "/offers/" + offer1.id + "/review_offer/items");
    equal($.trim(find('.status-message').text()), "Start Review");
  });
});

// display initial char with message
test("Display offer status for offer under review", function() {
  visit('/offers/' + offer2.id + "/review_offer/items");

  andThen(function() {
    equal(currentURL(), "/offers/" + offer2.id + "/review_offer/items");

    // message detail
    var status = $.trim(find('.status-message').text());
    equal(status.indexOf("Started by "+ reviewerName) >= 0, true);
    equal(status.indexOf(reviewer.get('nameInitial')) >= 0, true);
  });
});

test("Display offer status for reviewed offer", function() {
  visit('/offers/' + offer3.id + "/review_offer/items");

  andThen(function() {
    equal(currentURL(), "/offers/" + offer3.id + "/review_offer/items");

    var message = $.trim(find('.status-message').text().replace(/\n/g, ''));
    equal(message, "Reviewed less than a minute ago. User to plan transport." );
  });
});

test("Display offer status for scheduled offer: Collection", function() {
  visit('/offers/' + offer4.id + "/review_offer/items");

  andThen(function() {
    equal(currentURL(), "/offers/" + offer4.id + "/review_offer/items");
    equal($.trim(find('.status-message').text().replace(/\s{2,}/g, ' ')), "Collection Mon 1st , Afternoon");
  });
});

test("Display offer status for scheduled offer: Gogovan", function() {
  visit('/offers/' + offer5.id + "/review_offer/items");

  andThen(function() {
    equal(currentURL(), "/offers/" + offer5.id + "/review_offer/items");
    equal($.trim(find('.status-message').text().replace(/\s{2,}/g, ' ')), "Van Booked Afternoon, 2pm-4pm, Mon 1st");
  });
});

test("Display offer status for scheduled offer: Drop Off", function() {
  visit('/offers/' + offer6.id + "/review_offer/items");

  andThen(function() {
    equal(currentURL(), "/offers/" + offer6.id + "/review_offer/items");
    equal($.trim(find('.status-message').text().replace(/\s{2,}/g, ' ')), "Drop-off Mon 1st , Afternoon");
  });
});

test("Display offer status for closed offer", function() {
  visit('/offers/' + offer7.id + "/review_offer/items");

  andThen(function() {
    equal(currentURL(), "/offers/" + offer7.id + "/review_offer/items");
    equal($.trim(find('.status-message').text()), "Offer closed by " + reviewerName + " less than a minute ago");
  });
});

test("Display offer status for all rejected items", function() {
  visit('/offers/' + offer8.id + "/review_offer/items");

  andThen(function() {
    equal(currentURL(), "/offers/" + offer8.id + "/review_offer/items");
    equal($.trim(find('.status-message').text()), "No items needed  Close Offer");
  });
});

test("Display offer status for all reviewed items", function() {
  visit('/offers/' + offer9.id + "/review_offer/items");

  andThen(function() {
    equal(currentURL(), "/offers/" + offer9.id + "/review_offer/items");
    equal($.trim(find('.status-message').text()), "All items reviewed  Set logistics to complete");
  });
});

test("Display offer status for received offer-items", function() {
  visit('/offers/' + offer10.id + "/review_offer/items");

  andThen(function() {
    equal(currentURL(), "/offers/" + offer10.id + "/review_offer/items");
    var donor_name = offer10.get("createdBy.firstName") + " " + offer10.get("createdBy.lastName");
    equal($.trim(find('.status-message').text()), "Goods received by " + donor_name + " less than a minute ago");
  });
});
