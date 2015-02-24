import Ember from 'ember';
import startApp from '../helpers/start-app';
import syncDataStub from '../helpers/empty-sync-data-stub';

var TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);
var App, testHelper, offer, item1, item2;

module('Reviewer: Rejct Item Tab', {
  setup: function() {
    App = startApp({}, 2);
    testHelper = TestHelper.setup(App);

    offer = FactoryGuy.make("offer", { state:"under_review"});
    item1 = FactoryGuy.make("item_with_type", { offer: offer});
    item2 = FactoryGuy.make("item", { offer: offer});
  },

  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("visit rejected item without item_type", function() {
  visit("/offers/" + offer.id + "/review_item/" + item2.id + "/reject");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item2.id + "/reject");
    equal($('.select2-chosen').text(), "Add item label");
    equal($('p.no-items').text(), "Please choose Item Type first!");
  });
});

test("visit rejected item with item_type", function() {
  visit("/offers/" + offer.id + "/review_item/" + item1.id + "/reject");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item1.id + "/reject");
    equal($('.select2-chosen').text(), item1.get('itemType.name'));
    equal($(".reject-offer ul li").length, 4);

    //placeholder message in recjectio comments textarea
    equal($('textarea').attr('placeholder'), "Message to donor about the rejection of this item");
  });
});

test("validate at least one option selected", function() {
  visit("/offers/" + offer.id + "/review_item/" + item1.id + "/reject");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item1.id + "/reject");
    click(find('a.rejectOffer'));
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
