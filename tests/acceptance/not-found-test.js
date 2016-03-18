import Ember from 'ember';
import startApp from '../helpers/start-app';
import testSkip from '../helpers/test-skip';
import FactoryGuy from 'ember-data-factory-guy';

var App, offer, t;

module('Display not found error', {
  setup: function() {
    App = startApp();
    Ember.run.later = () => true;
    offer = FactoryGuy.make("offer");
    var i18n = App.__container__.lookup('service:i18n');
    t = i18n.t.bind(i18n);
    App.__container__.lookup("service:logger").error = () => {};
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

// Test cases with responses as error-statuscodes fails
// https://github.com/emberjs/ember.js/issues/12791

testSkip("Display error popup for invalid offer", function() {
  $('.reveal-modal').remove();
  visit("/offers/invalid/review_offer/items");

  andThen(function(){
    equal(Ember.$("#messageBoxText").text(), t("404_error").toString());
    Ember.$('#errorModal').foundation('reveal', 'close');
  });
});

testSkip("Display error popup for invalid item", function() {
  $('.reveal-modal').remove();
  visit("/offers/" + offer.id + "/review_item/invalid/accept");
  $.mockjax({url:"/api/v1/items/*",status:404});

  andThen(function(){
    equal(Ember.$("#messageBoxText").text(), t("404_error").toString());
    Ember.$('#errorModal').foundation('reveal', 'close');
  });
});

test("Display not-found page for invalid url", function() {
  $('.reveal-modal').remove();
  visit("/invalid_url");
  andThen(function(){
    equal(currentURL(), "/invalid_url");
    notEqual(Ember.$(".xy-center").text().indexOf(t("not_found")), -1, "not found message found");
  });
});
