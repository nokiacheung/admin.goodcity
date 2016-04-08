import Ember from 'ember';
import startApp from '../helpers/start-app';
import FactoryGuy from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';

var App, offer, item1, item2;

module('Reviewer: Rejct Item Tab', {
  beforeEach: function() {
    App = startApp({}, 2);
    TestHelper.setup();

    offer = FactoryGuy.make("offer", { state:"under_review"});
    item1 = FactoryGuy.make("item_with_type", { offer: offer});
    item2 = FactoryGuy.make("item", { offer: offer});
  },

  afterEach: function() {
    Em.run(function() { TestHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("visit rejected item without item_type", function() {
  visit("/offers/" + offer.id + "/review_item/" + item2.id + "/reject");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item2.id + "/reject");
    equal($('input[disabled]').val(), "");
    equal($('p.no-items').text(), "Please choose Item Type first!");
  });
});

test("visit rejected item with item_type", function() {
  visit("/offers/" + offer.id + "/review_item/" + item1.id + "/reject");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item1.id + "/reject");
    equal($('input[disabled]').val(), item1.get('packageType.name'));
    equal($(".reject-offer ul li").length, 4);

    //placeholder message in recjectio comments textarea
    equal($('textarea').attr('placeholder'), "Message to donor about the rejection of this item");
  });
});

test("validate at least one option selected", function() {
  visit("/offers/" + offer.id + "/review_item/" + item1.id + "/reject");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item1.id + "/reject");
    click('.rejectOffer');
    andThen(function(){
      equal($.trim($(".error-box").text()), "Please choose a reason.");
    });
  });
});

test("display message for quality option", function() {
  visit("/offers/" + offer.id + "/review_item/" + item1.id + "/reject");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item1.id + "/reject");
    click($('input[type=radio]:eq(0)'));
    andThen(function(){
      // set textarea conent on click of radio option
      equal($('textarea').val(), "Unfortunately we cannot receive this item. Some categories of items are very difficult for us to distribute unless they are in excellent condition.");

      // clear message conent on click of x-icon
      click($('.remove-text'));
      andThen(function(){
        equal($('textarea').val(), "");
      });
    });
  });
});
