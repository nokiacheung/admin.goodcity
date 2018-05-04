import Ember from 'ember';
import startApp from '../helpers/start-app';
import FactoryGuy from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import { module, test } from 'qunit';
import '../factories/user';
import '../factories/offer';
import '../factories/item';
import '../factories/contact';
import '../factories/gogovan_order';
import '../factories/delivery';
import '../factories/address';
import '../factories/role';

var App, offer, user, ggvOrder, delivery, address, contact, item, role;

module('Search Offers', {
  beforeEach: function() {
    App = startApp({}, 2);
    TestHelper.setup();
    Ember.run.debounce = (context, func) => func.call(context);

    role = FactoryGuy.make("role");
    $.mockjax({url: '/api/v1/role*', type: 'GET', status: 200,responseText: {
      roles: [role.toJSON({includeId: true})]
      }
    });

    user  = FactoryGuy.make("user", { firstName: "John", mobile: "99999999" });
    offer = FactoryGuy.make("offer_with_items", { state: "scheduled", createdBy: user });
    item = FactoryGuy.make("item", { offer: offer, state: "accepted" });

    ggvOrder = FactoryGuy.make("gogovan_active_order");
    contact  =  FactoryGuy.make("contact");
    delivery = FactoryGuy.make("delivery", { gogovanOrder: ggvOrder, offer: offer, contact: contact });
    address  = FactoryGuy.make("address", { 'addressable': contact });
  },
  afterEach: function() {
    Em.run(function() { TestHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("search offers by donor name", function(assert) {
  assert.expect(2);
  visit("/search");

  andThen(function(){
    assert.equal(currentURL(), "/search");
    fillIn('#searchText', user.get("firstName"));

    andThen(function(){
      assert.equal(find('ul li').length, 1);
    });
  });
});

test("search offers by item description", function(assert) {
  assert.expect(2);
  visit("/search");

  andThen(function(){
    assert.equal(currentURL(), "/search");
    fillIn('#searchText', item.get("donorDescription"));

    andThen(function(){
      assert.equal(find('ul li').length, 1);
    });
  });
});

test("search offers by donor mobile", function(assert) {
  assert.expect(2);
  visit("/search");

  andThen(function(){
    assert.equal(currentURL(), "/search");
    fillIn('#searchText', user.get("mobile"));

    andThen(function(){
      assert.equal(find('ul li').length, 1);
    });
  });
});

test("search offers by vehicle number", function(assert) {
  assert.expect(3);
  visit("/search");

  andThen(function(){
    assert.equal(currentURL(), "/search");
    fillIn('#searchText', ggvOrder.get("driverLicense"));

    andThen(function(){
      assert.equal(find('ul li').length, 1);
      assert.equal(find('ul li img').length, 1);
    });
  });
});

test("search offers by delivery address", function(assert) {
  assert.expect(3);

  visit("/search");

  andThen(function(){
    assert.equal(currentURL(), "/search");
    Ember.run(function() {
      fillIn('#searchText', address.get("flat"));
    });

    andThen(function(){
      assert.equal(find('ul li').length, 1);
      assert.equal(find('ul li img').length, 1);
    });
  });
});
