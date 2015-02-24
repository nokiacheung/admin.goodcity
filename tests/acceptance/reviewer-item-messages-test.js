import Ember from 'ember';
import startApp from '../helpers/start-app';
import syncDataStub from '../helpers/empty-sync-data-stub';

var TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);
var App, testHelper, offer, item, message1, message2, message3;

module('Reviewer: Display Item Messages', {
  setup: function() {
    App = startApp({}, 2);
    testHelper = TestHelper.setup(App);

    offer = FactoryGuy.make("offer", { state:"under_review"});
    item = FactoryGuy.make("item", { state:"submitted", offer: offer});
    message1 = FactoryGuy.make("message", { offer: offer, item: item});
    message2 = FactoryGuy.make("message", { offer: offer, item: item, body: "Message from Donor"});
    message3 = FactoryGuy.make("message", { offer: offer, item: item, body: "Message from Supervisor", isPrivate: true});
  },

  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("item-messages from donor", function() {
  visit('/offers/' + offer.id + "/review_item/" + item.id + "/donor_messages");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item.id + "/donor_messages");
    equal($('.message_details').length, 2);

    var offer_message_thread_text = $('.message_details:last').parent().text();
    equal(offer_message_thread_text.indexOf(message2.get('body')) >= 0, true);
  });
});

test("item-messages from Supervisor", function() {
  visit('/offers/' + offer.id + "/review_item/" + item.id + "/supervisor_messages");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item.id + "/supervisor_messages");
    equal($('.message_details').length, 1);

    var offer_message_thread_text = $('.message_details:last').parent().text();
    equal(offer_message_thread_text.indexOf(message3.get('body')) >= 0, true);
  });
});

test("item-messages from donor should add unread bubble in donor message tab", function() {
  visit('/offers/' + offer.id + "/review_item/" + item.id + "/supervisor_messages");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item.id + "/supervisor_messages");

    var message4 = FactoryGuy.make("message", { offer: offer, item: item, body: "Second Message from Donor"});

    // if message received from donor, add unread bubble mark
    equal($("a[href='/offers/"+ offer.id +"/review_item/"+ item.id +"/donor_messages'] i.unread").length, 1);
  });
});

test("offer-messages from staff should add unread bubble in supervisor message tab", function() {
  visit('/offers/' + offer.id + "/review_item/" + item.id + "/donor_messages");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item.id + "/donor_messages");

    var message5 = FactoryGuy.make("message", { offer: offer, item: item, body: "Second Message from Supervisor", isPrivate: true});

    // if message received from donor, add unread bubble mark
    equal($("a[href='/offers/"+ offer.id +"/review_item/"+ item.id +"/supervisor_messages'] i.unread").length, 1);
  });
});
