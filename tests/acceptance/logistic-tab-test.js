import Ember from 'ember';
import startApp from '../helpers/start-app';
import FactoryGuy from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';

var App, offer, item, reviewer, offer2, item2, offer3, item3,
  delivery1, ggv_order1, offer5, item5, delivery2, ggv_order2,
  offer6, item6, offer7, t;

module('Review Offer Logistics', {
  beforeEach: function() {
    App = startApp({}, 2);
    TestHelper.setup();
    lookup('service:session').set('isAdmin', true);
    var i18n = App.__container__.lookup('service:i18n');
    t = i18n.t.bind(i18n);

    reviewer = FactoryGuy.make("user");
    offer = FactoryGuy.make("offer", { state: "under_review", reviewedBy:  reviewer });
    item = FactoryGuy.make("item", { offer: offer, state: "submitted"});
    offer2 = FactoryGuy.make("offer", { state:"scheduled"});
    item2  = FactoryGuy.make("item", { state:"accepted", offer: offer2});

    offer3 = FactoryGuy.make("offer", { state: "under_review" });
    item3 = FactoryGuy.make("item", { state:"rejected", offer: offer3 });

    ggv_order1 = FactoryGuy.make("gogovan_order");
    delivery1 = FactoryGuy.make("delivery", { deliveryType: "Gogovan", gogovanOrder: ggv_order1 });
    offer5 = FactoryGuy.make("offer", {state:"scheduled", delivery: delivery1});
    item5  = FactoryGuy.make("item", {state:"accepted", offer: offer5});

    ggv_order2 = FactoryGuy.make("gogovan_active_order", {ggvUuid: "123456", bookingId: "654321", driverMobile: "12345678"});
    delivery2 = FactoryGuy.make("delivery", { deliveryType: "Gogovan", gogovanOrder: ggv_order2 });
    offer6 = FactoryGuy.make("offer", {state:"scheduled", delivery: delivery2});
    item6  = FactoryGuy.make("item", {state:"accepted", offer: offer6});

    offer7 = FactoryGuy.make("offer_with_items", {state:"received", deliveredBy: "Gogovan"});
  },
  afterEach: function() {
    Em.run(function() { TestHelper.teardown(); });
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
    equal($(".gogovan-req input[type='radio']").length, 4);
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
      equal(currentURL(), "/offers/4/review_offer/logistics");
    });
  });
});

test("for rejected offer-items", function() {
  visit('/offers/' + offer3.id + "/review_offer/logistics");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer3.id + "/review_offer/logistics");
    equal($(".info-text").text(), "No items to transport.");
  });
});

test("for scheduled offer", function() {
  visit('/offers/' + offer2.id + "/review_offer/logistics");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer2.id + "/review_offer/logistics");

    equal($.trim($(".delivery-details .row:eq(4)").text()), "Accepted items to be transported");
    equal($(".items_list img").length, 1);
    equal($('.transport-buttons a').length, 2);
  });
});

test("cancel booking of scheduled offer with pending GGV order state", function() {
  // todo: remove workaround for message box button actions not firing only under test environment
  lookup("service:messageBox").custom = (message, btn1Text, btn1Callback, btn2Text, btn2Callback) => {
    btn2Callback();
  };

  visit('/offers/' + offer5.id + "/review_offer/logistics");

  andThen(function() {
    equal(currentURL(), "/offers/" + offer5.id + "/review_offer/logistics");
  });

  click("a:contains('Cancel Booking')");
  // confirm prompt invoked, ok automatically called with above workaround

  andThen(function(){
    equal(currentURL(), "/offers/" + offer5.id + "/review_offer/items");
  });
});

test("cancel booking of scheduled offer with active GGV order state", function() {
  visit('/offers/' + offer6.id + "/review_offer/logistics");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer6.id + "/review_offer/logistics");

    click(find("a:contains('Cancel Booking')"));
    andThen(function(){
      equal(currentURL(), "/offers/" + offer6.id + "/delivery/" + delivery2.id + "/cancel_booking");
    });
  });
});

test("for scheduled offer with pending GGV order state", function() {
  visit('/offers/' + offer5.id + "/review_offer/logistics");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer5.id + "/review_offer/logistics");

    equal(($.trim($(".delivery-details .row:eq(0)").text()).indexOf('Awaiting Driver Confirmation') >= 0), true);
    equal(($.trim($(".delivery-details .row:eq(0)").text()).indexOf('Driver & vehicle details will appear here once a driver accepts your booking.') > 0), true);

    equal($.trim($('.delivery-details .row:eq(1)').text()), "Accepted items to be transported");
    equal($(".items_list img").length, 1);
    equal($('.transport-buttons a').length, 2);
  });
});

test("for scheduled offer with active GGV order state", function() {
  visit('/offers/' + offer6.id + "/review_offer/logistics");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer6.id + "/review_offer/logistics");

    equal(($.trim($(".transport-content .row:eq(0)").text()).indexOf('Booking Confirmed') >= 0), true);

    // driver name
    equal((($.trim($(".delivery-details .gogovan_status .row:eq(0)").text())).indexOf(ggv_order2.get('driverName')) > 0), true);

    // driver mobile
    equal((($.trim($(".delivery-details .gogovan_status").text())).indexOf("1234 5678") > 0), true);

    // driver License
    equal((($.trim($(".delivery-details .gogovan_status .row:eq(2)").text())).indexOf(ggv_order2.get('driverLicense')) > 0), true);

    equal((($.trim($(".delivery-details .gogovan_status .row:eq(3)").text())).indexOf(ggv_order2.get('price')) > 0), true);

    equal($.trim($('.delivery-details .row:eq(5)').text()), "Accepted items to be transported");
    equal($(".items_list img").length, 1);
    equal($('.transport-buttons a').length, 2);

    equal($(".booking-id div:first").text().trim(), t("delivery_details.id"));
    equal($(".booking-id div:last").text().trim().indexOf("654321") >= 0, true);
    equal($(".booking-id div:last a").text().trim().indexOf(t("delivery_details.driver_screen")) >=0, true);
    equal($(".delivery-details .row:eq(7) div a").text().trim().indexOf("Driver Screen") >=0, true);
  });
});

test("for received offer", function() {
  visit('/offers/' + offer7.id + "/review_offer/logistics");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer7.id + "/review_offer/logistics");
    var text = $(".transport-content div:first").text().trim();
    equal(text.indexOf("Goods received on") >= 0, true);
    equal(text.indexOf("via Gogovan") >= 0, true);
  });
});
