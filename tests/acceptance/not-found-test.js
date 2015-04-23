import Ember from 'ember';
import startApp from '../helpers/start-app';

var TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);
var App, testHelper, offer, offer_error, item_error, item, display_item_url;

module('Display not found error', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);
    Ember.run.later = (context, func) => true;
    offer = FactoryGuy.make("offer");
  },
  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("Display error popup for invalid offer", function() {
  visit("/offers/invalid/review_offer/items");

  andThen(function(){
    equal(Ember.$("#errorMessage").text(), Ember.I18n.t("404_error"));
    Ember.$('#errorModal').foundation('reveal', 'close');
  });
});

test("Display error popup for invalid item", function() {
  visit("/offers/" + offer.id + "/review_item/invalid/accept");
  $.mockjax({url:"/api/v1/items/*",status:404});

  andThen(function(){
    equal(Ember.$("#errorMessage").text(), Ember.I18n.t("404_error"));
    Ember.$('#errorModal').foundation('reveal', 'close');
  });
});

test("Display not-found page for invalid url", function() {
  visit("/invalid_url");
  andThen(function(){
    equal(currentURL(), "/invalid_url");
    notEqual(Ember.$(".xy-center").text().indexOf(Ember.I18n.t("not_found")), -1, "not found message found");
  });
});
