import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, testHelper, offer, item, reviewer, offer2, item2, offer3, item3,
  TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

module('Review Offer Logistics', {
  setup: function() {
    App = startApp({}, 2);
    testHelper = TestHelper.setup(App);

    reviewer = FactoryGuy.make("user");
    offer = FactoryGuy.make("offer", { state: "under_review", reviewedBy:  reviewer });
    item = FactoryGuy.make("item", { offer: offer, state: "submitted"});
    offer2 = FactoryGuy.make("offer", { state:"scheduled"});
    item2  = FactoryGuy.make("item", { state:"accepted", offer: offer2});

    offer3 = FactoryGuy.make("offer", { state: "under_review" });
    item3 = FactoryGuy.make("item", { state:"rejected", offer: offer3 });
  },
  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("for pending review of items", function() {
  visit("/offers/"+ offer.id +"/review_offer/logistics");

  andThen(function(){
    equal($.trim($('p.no-items').text()), "Please finish reviewing items first!");
  });
});

test("for completed review of items", function() {
  visit("/offers/4/review_offer/logistics");

  andThen(function(){
    equal($.trim($('h3').text()), "Accepted Items (1)");
    equal($(".gogovan-req input[type='radio']").length, 3);
    equal($(".gogovan-req select option").length, 9);
    equal(find("button:contains('Complete Review')").length, 1);
  });
});

test("complete review of offer", function() {
  visit("/offers/4/review_offer/logistics");

  andThen(function(){
    click('#1');
    var crossroadsOption = find('.gogovan-req select option:contains("1/8 Truck")').val();
    find('.gogovan-req select').val(crossroadsOption).change();
    click(find("button:contains('Complete Review')"));

    andThen(function(){
      equal(currentURL(), "/offers/4/review_offer/items");
    });
  });
});

test("for scheduled offer", function() {
  visit('/offers/' + offer2.id + "/review_offer/logistics");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer2.id + "/review_offer/logistics");

    equal($.trim($(".delivery-details .row:eq(0)").text()), "Accepted items to be transported");
    equal($(".items_list img").length, 1);
    equal($('.transport-buttons a').length, 2);
  });
});

test("for rejected offer-items", function() {
  visit('/offers/' + offer3.id + "/review_offer/logistics");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer3.id + "/review_offer/logistics");
    equal($(".info-text").text(), "No items to transport.");

    // page has link to donor-messages page
    equal($("a[href='/offers/"+ offer3.id +"/donor_messages']").length, 1);

    // page has button to close offer
    equal($(".noTransportItems a:eq(0)").text(), 'Close Offer');
  });
});
