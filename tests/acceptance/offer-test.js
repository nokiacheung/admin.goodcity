import Ember from 'ember';
import startApp from '../helpers/start-app';
import syncDataStub from '../helpers/empty-sync-data-stub';

var TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);
var App, testHelper, store, offer, item1, item2, image;

module('Display Offer', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);
    store = testHelper.getStore();
    syncDataStub(testHelper);

    offer = FactoryGuy.make("offer");
    item1 = FactoryGuy.make("item", {offer:offer,state:"submitted"});
    item2 = FactoryGuy.make("item", {offer:offer,state:"submitted"});
    image = FactoryGuy.make("image", {item:item1,favourite:true});
  },

  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("Display offer details", function() {
  visit('/offers/' + offer.id + "/offer_details");

  andThen(function() {
    // offer show page
    equal(currentURL(), "/offers/" + offer.id + "/offer_details");
    equal($.trim(find('.tab-bar-section .title').text()), "Offer Details");

    // add-item & remove-item buttons and confirm offer link
    // equal(find("a:contains('Add Item')").length, 1);
    equal(find("a[href='/offers/" + offer.id + "/confirm']").length, 1);

    // list of all items
    equal(find('.item-content li img').length, 2);

    // favourite image for 'item2': default image
    equal(find('img[src="/assets/images/default_item.jpg"]').length, 1);

    // favourite image for 'item': image2
    equal(find("img[src='" + image.get("thumbImageUrl") + "']").length, 1);
  });
});

test("Confirm and Submit Offer", function(){
  visit("/offers/" + offer.id + "/offer_details");
  click("a[href='/offers/"+ offer.id +"/confirm']");

  andThen(function() {
    equal(/Confirm/i.test($('body h1').text()), true);
    equal(currentURL(), "/offers/" + offer.id + "/confirm");

    // confirm offer page has submit link
    equal(find("a[href='/offers/" + offer.id + "/submit']").length, 1);

    click("a[href='/offers/" + offer.id + "/submit']");

    andThen(function() {
      equal(/Sale of goods/i.test($('body h1').text()), true);
      equal(currentURL(), "/offers/" + offer.id + "/submit");


      click("button:contains('Yes')");

      andThen(function() {
        equal(currentURL(), "/offers/" + offer.id + "/offer_details");
      });
    });
  });
});
