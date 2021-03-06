import Ember from 'ember';
import startApp from '../helpers/start-app';
import FactoryGuy from 'ember-data-factory-guy';
import { module, test } from 'qunit';
import '../factories/message';
import '../factories/offer';
import '../factories/item';
import '../factories/role';
import '../factories/gogovan_order';
import '../factories/delivery';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import '../helpers/custom-helpers';
// import syncDataStub from '../helpers/empty-sync-data-stub';

var App, offer, item, message1, message2, message3, message4, message5, role;

module('Reviewer: Notifications', {
  beforeEach: function() {
    App = startApp({}, 2);
    TestHelper.setup();
    role = FactoryGuy.make("role");
    $.mockjax({url: '/api/v1/role*', type: 'GET', status: 200,responseText: {
      roles: [role.toJSON({includeId: true})]
      }
    });
    offer = FactoryGuy.make("offer", { state:"under_review"});
    item = FactoryGuy.make("item", { state:"submitted", offer: offer});
    message1 = FactoryGuy.make("message", { offer: offer, item: item });
    message2 = FactoryGuy.make("message", { offer: offer, item: item, body: "Message from Donor"});
    message3 = FactoryGuy.make("message", { offer: offer, item: item, body: "Message from Supervisor", isPrivate: true, state: "read"});
    message4 = FactoryGuy.make("message", { offer: offer, item: null, body: "General Message for offer"});
    message5 = FactoryGuy.make("message", { offer: offer, item: null, state: "read", isPrivate: true});
  },

  afterEach: function() {
    Em.run(function() { TestHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("display threads with icons and unread message count" , function(assert) {
  assert.expect(8);
  visit('/my_notifications');
  andThen(function() {
    var assertions = function() {
      //Item thread with donor
      var item_thread = $(".thread:first");
      //item image, unread count and heading
      assert.equal($(item_thread).find(".thread_image img").length > 0, true);
      assert.equal($(item_thread).find(".unread_length").text(), 2);
      assert.equal($(item_thread).find(".message-text").text().indexOf(item.get("donorDescription")) >=0, true);

      //Item thread with supervisor
      var item_private_thread = $(".thread")[1];
      //group icon, unread count and message
      assert.equal($(item_private_thread).find(".fa-users").length > 0, true);
      assert.equal($(item_private_thread).find(".unread_length").length, 0);
      assert.equal($(item_private_thread).find(".thread_last_message").text().trim(), message3.get("body"));

      //Offer thread message with donor
      var offer_thread = $(".thread")[2];
      //thread icon and heading
      assert.equal($(offer_thread).find(".thread_image .fa-bullhorn").length > 0, true);
      assert.equal($(offer_thread).find(".message-text").text().trim().indexOf(offer.get("createdBy.fullName") + "'s Offer") >= 0, true);

      // PENDING: not rendering last thread
      // Offer with supervisor
      // var offer_private_thread = $(".thread")[3];
      // assert.equal($(offer_thread).find(".fa-bullhorn").length > 0, true);
      // assert.equal($(offer_private_thread).find(".fa-users").length > 0, true);
    };

    runloopFix(assertions);
  });
});

test("display unread notification count on notification-bell icon" , function(assert) {
  assert.expect(2);
  visit('/offers');
  andThen(function() {
    assert.equal(currentURL(), "/offers/submitted");
    assert.equal($("span.unread .unread_length").text(), 3);
  });
});

test("redirect to notifications page on click of notification-bell icon" , function(assert) {
  assert.expect(3);
  visit('/offers');
  andThen(function() {
    assert.equal(currentURL(), "/offers/submitted");
    assert.equal($("span.unread .unread_length").text(), 3);

    click("a.all_unread_messages_count");
    andThen(function() {
      assert.equal(currentURL(), "/my_notifications");
    });
  });
});

test("filter unread notifications" , function(assert) {
  assert.expect(2);
  visit("/my_notifications");
  andThen(function() {
    var assertions = function() {
      assert.equal(currentURL(), "/my_notifications");

      click(".my-notifications a:eq(0)");
      andThen(function() {
        assert.equal($(".thread").length, 2);
      });
    };

    runloopFix(assertions);
  });
});
