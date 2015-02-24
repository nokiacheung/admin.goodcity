import Ember from 'ember';
import startApp from '../helpers/start-app';
import syncDataStub from '../helpers/empty-sync-data-stub';

var TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);
var App, testHelper, offer1, offer2, reviewer, reviewer1, reviewerName,
  offer7, offer3, offer4, delivery1, delivery2, offer5, delivery3, offer6,
  offer8, reviewer1Name;

module('Donor: Display Offer Status', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);
    syncDataStub(testHelper);

    reviewer = FactoryGuy.make("user");
    reviewer1 = FactoryGuy.make("user_with_image");
    offer1 = FactoryGuy.make("offer_with_items", {state:"submitted"});
    offer2 = FactoryGuy.make("offer_with_items", {state:"under_review", reviewedBy: reviewer});
    reviewerName = reviewer.get("firstName");
    offer3 = FactoryGuy.make("offer_with_items", {state:"reviewed"});

    delivery1 = FactoryGuy.make('delivery', {deliveryType: "Alternate"});
    offer4 = FactoryGuy.make("offer_with_items", {state:"scheduled", delivery: delivery1});

    delivery2 = FactoryGuy.make('delivery', {deliveryType: "Gogovan"});
    offer5 = FactoryGuy.make("offer_with_items", {state:"scheduled", delivery: delivery2});

    delivery3 = FactoryGuy.make('delivery', {deliveryType: "Drop Off"});
    offer6 = FactoryGuy.make("offer_with_items", {state:"scheduled", delivery: delivery3});

    offer7 = FactoryGuy.make("offer_with_items", {state:"closed"});
    offer8 =  FactoryGuy.make("offer_with_items", {state:"under_review", reviewedBy: reviewer1});
  },

  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("Display offer status for submitted offer", function() {
  visit('/offers/' + offer1.id + "/offer_details");

  andThen(function() {
    equal(currentURL(), "/offers/" + offer1.id + "/offer_details");
    equal($.trim(find('.status-message').text()), "Your offer is awaiting review.");
  });
});

// display initial char with message
test("Display offer status for offer under review", function() {
  visit('/offers/' + offer2.id + "/offer_details");

  andThen(function() {
    equal(currentURL(), "/offers/" + offer2.id + "/offer_details");

    // message detail
    var status = $.trim(find('.status-message').text());
    equal(status.indexOf("Your offer is being reviewed by "+ reviewerName +".") >= 0, true);
    equal(status.indexOf(reviewer.get('nameInitial')) >= 0, true);
  });
});

//display image with message
test("Display offer status with image", function() {
  visit('/offers/' + offer8.id + "/offer_details");
  andThen(function() {
    var image_tag = $('.status-message img.no-avatar');
    equal(image_tag.length, 1);
  });
});

test("Display offer status for reviewed offer", function() {
  visit('/offers/' + offer3.id + "/offer_details");

  andThen(function() {
    equal(currentURL(), "/offers/" + offer3.id + "/offer_details");
    equal($.trim(find('.status-message').text()), "Review complete! Please arrange transport.");
  });
});

test("Display offer status for scheduled offer: Collection", function() {
  visit('/offers/' + offer4.id + "/offer_details");

  andThen(function() {
    equal(currentURL(), "/offers/" + offer4.id + "/offer_details");
    equal($.trim(find('.status-message').text().replace(/\s{2,}/g, ' ')), "Collection Mon 1st , Afternoon");
  });
});

test("Display offer status for scheduled offer: Gogovan", function() {
  visit('/offers/' + offer5.id + "/offer_details");

  andThen(function() {
    equal(currentURL(), "/offers/" + offer5.id + "/offer_details");
    equal($.trim(find('.status-message').text().replace(/\s{2,}/g, ' ')), "Van Booked Afternoon, 2pm-4pm, Mon 1st");
  });
});

test("Display offer status for scheduled offer: Drop Off", function() {
  visit('/offers/' + offer6.id + "/offer_details");

  andThen(function() {
    equal(currentURL(), "/offers/" + offer6.id + "/offer_details");
    equal($.trim(find('.status-message').text().replace(/\s{2,}/g, ' ')), "Drop-off Mon 1st , Afternoon");
  });
});

test("Display offer status for closed offer", function() {
  visit('/offers/' + offer7.id + "/offer_details");

  andThen(function() {
    equal(currentURL(), "/offers/" + offer7.id + "/offer_details");
    equal($.trim(find('.status-message').text()), "Offer closed. No items needed, Sorry.");
  });
});
