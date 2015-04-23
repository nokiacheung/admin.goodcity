import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, testHelper, offer, user, ggvOrder, delivery, address, contact,
  TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

module('Search Offers', {
  setup: function() {
    App = startApp({}, 2);
    testHelper = TestHelper.setup(App);
    Ember.run.debounce = (context, func) => func.call(context);

    user  = FactoryGuy.make("user", { firstName: "John", mobile: "99999999" });
    offer = FactoryGuy.make("offer_with_items", { state: "scheduled", createdBy: user });

    ggvOrder = FactoryGuy.make("gogovan_active_order");
    delivery = FactoryGuy.make("delivery", { gogovanOrder: ggvOrder, offer: offer });
    contact = delivery.get("contact");
    address = FactoryGuy.make("address", { 'addressable': contact });
  },
  teardown: function() {
    // Ember.run.cancelTimers()
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("search offers by donor name", function() {
  visit("/search");

  andThen(function(){
    equal(currentURL(), "/search");
    fillIn('#searchText', user.get("firstName"));

    andThen(function(){
      equal(find('ul li').length, 1);
    });
  });
});

test("search offers by donor mobile", function() {
  visit("/search");

  andThen(function(){
    equal(currentURL(), "/search");
    fillIn('#searchText', user.get("mobile"));

    andThen(function(){
      equal(find('ul li').length, 1);
    });
  });
});

test("search offers by vehicle number", function() {
  visit("/search");
test("search offers by vehicle number", function() {
  visit("/search");

  andThen(function(){
    equal(currentURL(), "/search");
    fillIn('#searchText', ggvOrder.get("driverLicense"));

    andThen(function(){
      equal(find('ul li').length, 1);
      equal(find('ul li img').length, 1);
    });
  });
});
  andThen(function(){
    equal(currentURL(), "/search");
    fillIn('#searchText', ggvOrder.get("driverLicense"));

    andThen(function(){
      equal(find('ul li').length, 1);
      equal(find('ul li img').length, 1);
    });
  });
});

test("search offers by vehicle number", function() {
  visit("/search");

  andThen(function(){
    equal(currentURL(), "/search");
    fillIn('#searchText', ggvOrder.get("driverLicense"));

    andThen(function(){
      equal(find('ul li').length, 1);
      equal(find('ul li img').length, 1);
    });
  });
});

test("search offers by delivery address", function() {
  visit("/search");

  andThen(function(){
    equal(currentURL(), "/search");
    fillIn('#searchText', address.get("flat"));

    andThen(function(){
      equal(find('ul li').length, 1);
      equal(find('ul li img').length, 1);
    });
  });
});
