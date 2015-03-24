import Ember from 'ember';
import startApp from '../helpers/start-app';

var TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);
var App, testHelper, offer, offer_error, item_error, item, display_item_url;

module('Display not found error', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);
    offer = FactoryGuy.make("offer");
  },
  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("Display error popup for invalid offer", function() {
  offer_error = "The offer you were looking for could not be found.";
  visit("/offers/invalid/review_offer/items");

  andThen(function(){
    equal($("#errorMessage").text() === offer_error, true);
    $('#errorModal').foundation('reveal', 'close');
  });
});

test("Display error popup for invalid item", function() {
  item_error = "The item you were looking for could not be found.";
  visit("/offers/" + offer.id + "/review_item/invalid/accept");
  andThen(function(){
    equal($("#errorMessage").text() === item_error, true);
    $('#errorModal').foundation('reveal', 'close');
  });
});

test("Display not-found page for invalid url", function() {
  var not_found_message = "Oooops, the location you're headed to doesn't seem to exist anymore. Sorry!";
  visit("/invalid_url");
  andThen(function(){
    equal(currentURL(), "/invalid_url");
    equal($(".xy-center").text().indexOf(not_found_message) > 0, true);
  });
});

