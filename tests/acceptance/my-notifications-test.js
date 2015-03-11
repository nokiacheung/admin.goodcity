import Ember from 'ember';
import startApp from '../helpers/start-app';
// import syncDataStub from '../helpers/empty-sync-data-stub';

var TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);
var App, testHelper, offer, item, message1, message2, message3, message4, message5;

module('Reviewer: Notifications', {
  setup: function() {
    App = startApp({}, 2);
    testHelper = TestHelper.setup(App);

    offer = FactoryGuy.make("offer", { state:"under_review"});
    item = FactoryGuy.make("item", { state:"submitted", offer: offer});
    message1 = FactoryGuy.make("message", { offer: offer, item: item });
    message2 = FactoryGuy.make("message", { offer: offer, item: item, body: "Message from Donor"});
    message3 = FactoryGuy.make("message", { offer: offer, item: item, body: "Message from Supervisor", isPrivate: true, state: "read"});
    message4 = FactoryGuy.make("message", { offer: offer, item: null, body: "General Message for offer"});
    message5 = FactoryGuy.make("message", { offer: offer, item: null, state: "read", isPrivate: true});
  },

  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("display unread notification count on menu icon" , function() {
  visit('/inbox');
  andThen(function() {
    equal(currentURL(), "/inbox");
    equal($(".unread_length.menu-icon").text(), 3);
  });
});

test("display unread notification count in left navigation" , function() {
  visit('/inbox');
  andThen(function() {
    equal(currentURL(), "/inbox");
    equal($(".menu_notification .unread_length").text(), 3);
  });
});

test("display threads with icons and unread message count" , function() {
  visit('/my_notifications');
  andThen(function() {
    //Item thread with donor
    var item_thread = $(".thread:first");
    //item image, unread count and heading
    equal($(item_thread).find(".thread_image img").length > 0, true);
    equal($(item_thread).find(".unread_length").text(), 2);
    equal($(item_thread).find(".message-text").text().trim(), item.get("donorDescription"));

    //Item thread with supervisor
    var item_private_thread = $(".thread")[1];
    //group icon, unread count and message
    equal($(item_private_thread).find(".fa-users").length > 0, true);
    equal($(item_private_thread).find(".unread_length").length, 0);
    equal($(item_private_thread).find(".thread_last_message").text().trim(), message3.get("body"));

    //Offer thread message with donor
    var offer_thread = $(".thread")[2];
    //thread icon and heading
    equal($(offer_thread).find(".thread_image .fa-bullhorn").length > 0, true);
    equal($(offer_thread).find(".message-text").text().trim(), offer.get("createdBy.fullName") + "'s Offer");

    //Offer with supervisor
    var offer_private_thread = $(".thread")[3];
    equal($(offer_thread).find(".fa-bullhorn").length > 0, true);
    equal($(offer_private_thread).find(".fa-users").length > 0, true);

  });
});

// test("item-messages from Supervisor", function() {
//   visit('/offers/' + offer.id + "/review_item/" + item.id + "/supervisor_messages");
//   andThen(function() {
//     equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item.id + "/supervisor_messages");
//     equal($('.message_details').length, 1);

//     var offer_message_thread_text = $('.message_details:last').parent().text();
//     equal(offer_message_thread_text.indexOf(message3.get('body')) >= 0, true);
//   });
// });

// test("item-messages from donor should add unread bubble in donor message tab", function() {
//   visit('/offers/' + offer.id + "/review_item/" + item.id + "/supervisor_messages");
//   andThen(function() {
//     equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item.id + "/supervisor_messages");

//     var message3 = FactoryGuy.make("message", { offer: offer, item: item, body: "Second Message from Donor"});

//     // if message received from donor, add unread bubble mark
//     equal($("a[href='/offers/"+ offer.id +"/review_item/"+ item.id +"/donor_messages'] i.unread").length, 1);
//   });
// });

// test("offer-messages from staff should add unread bubble in supervisor message tab", function() {
//   visit('/offers/' + offer.id + "/review_item/" + item.id + "/donor_messages");
//   andThen(function() {
//     equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item.id + "/donor_messages");

//     var message5 = FactoryGuy.make("message", { offer: offer, item: item, body: "Second Message from Supervisor", isPrivate: true});

//     // if message received from donor, add unread bubble mark
//     equal($("a[href='/offers/"+ offer.id +"/review_item/"+ item.id +"/supervisor_messages'] i.unread").length, 1);
//   });
// });
