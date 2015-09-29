import Ember from 'ember';
import startApp from '../helpers/start-app';
import FactoryGuy from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';

var App, user, offer1, offer2, offer3, offer4;

module('Reviewer: Display Donor Details Tab', {
  setup: function() {
    App = startApp({}, 2);
    TestHelper.setup();

    user   = FactoryGuy.make("user");
    offer1 = FactoryGuy.make("offer_with_items", { state:"under_review", createdBy: user});
    offer2 = FactoryGuy.make("offer_with_items", { state:"submitted", createdBy: user});
    offer3 = FactoryGuy.make("offer_with_items", { state:"received", createdBy: user});
    offer4 = FactoryGuy.make("offer_with_items", { state:"draft", createdBy: user});
  },

  teardown: function() {
    Em.run(function() { TestHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("verify donor details", function() {

  $.mockjax({url:"/api/v1/twilio_outbound/generate_call_toke*",responseText:{}});
  window.Twilio = {
    Device: {
      setup: function() {},
      error: function() {},
      disconnectAll: function() {},
      disconnect: function() {}
    }
  };

  window.webkitRTCPeerConnection = true;

  visit("/offers/1/review_offer/donor_details");
  andThen(function() {
    equal(currentURL(), "/offers/1/review_offer/donor_details");

    equal($(".donor_details .no-avatar").text(), "K");
    equal($(".donor_details .donor").text().indexOf('Kendrick Kiehn') >= 0, true);
    equal($.trim($(".donor_details .donor").text()).indexOf('5111 1111') >= 0, true);
    equal($(".donor_details li").length, 3);
    equal($.trim($(".donor_details .row .row:eq(5)").text()).indexOf('Total offers') >= 0, true);
    equal($.trim($(".donor_details .row .row:eq(5)").text()).indexOf('4') >= 0, true);
  });
});
