import Ember from 'ember';
import startApp from '../helpers/start-app';
import '../factories/orders_package';
import '../factories/packages_location';
import { module, test } from 'qunit';
import '../factories/offer';
import FactoryGuy from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';

var App, offer1, item1, package1, package2, package3, orders_pkg1, packages_location;

module('Received Tab close options', {
  beforeEach: function() {
    App = startApp({}, 2);
    TestHelper.setup();
    item1 = FactoryGuy.make("item", {state: "accepted"});
    offer1 = FactoryGuy.make("offer", { state: "received", items: [item1] });
    packages_location = FactoryGuy.make("packages_location");
    orders_pkg1 = FactoryGuy.make("orders_package", { id: 500, state: "designated", quantity: 6});
    package1 = FactoryGuy.make("package", { offerId: parseInt(offer1.id), state: "expecting", item: item1});
    package2 = FactoryGuy.make("package", { offerId: parseInt(offer1.id), state: "expecting", item: item1});
    package3 = FactoryGuy.make("package", { offerId: parseInt(offer1.id), state: "expecting", item: item1});

  },
  afterEach: function() {
    Em.run(function() { TestHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("Clicking on receive item options closes other receive-options if already open", function(assert) {
  assert.expect(3);
  visit("/offers/"+offer1.id+"/review_offer/receive");
  $.mockjax({url: '/api/v1/packages_location*', type: 'GET', status: 200,responseText: {
      packages_locations: [packages_location.toJSON({includeId: true})]
    }
  });
  $.mockjax({url: '/api/v1/orders_package*', type: 'GET', status: 200,responseText: {
      orders_packages: [orders_pkg1.toJSON({includeId: true})]
    }
  });

  andThen(function(){
    //clicking on item options of first package
    Ember.$('.options-link-open.' + package1.id).click();
    assert.equal(Ember.$('.receive-options').not('.hidden').attr('class').includes(package1.id), true);
    //clicking on item optins of second package
    Ember.$('.options-link-open.' + package2.id).click();
    //checking if item option is closed for first package
    assert.equal(Ember.$('.receive-options').not('.hidden').attr('class').includes(package1.id), false);
    //checking if item option is open for second package
    assert.equal(Ember.$('.receive-options').not('.hidden').attr('class').includes(package2.id), true);
  });
});

test("Clicking on other item detail closes item options", function(assert) {
  assert.expect(2);
  visit("/offers/"+offer1.id+"/review_offer/receive");
  $.mockjax({url: '/api/v1/packages_location*', type: 'GET', status: 200,responseText: {
      packages_locations: [packages_location.toJSON({includeId: true})]
    }
  });
  $.mockjax({url: '/api/v1/orders_package*', type: 'GET', status: 200,responseText: {
      orders_packages: [orders_pkg1.toJSON({includeId: true})]
    }
  });

  andThen(function(){
    //clicking on item options of first package
    Ember.$('.options-link-open.' + package1.id).click();
    assert.equal(Ember.$('.receive-options').not('.hidden').attr('class').includes(package1.id), true);
    //clicking on item status of second package
    Ember.$('.package-expecting:first div div').click();
    //checking if item option is closed for first package
    assert.equal(Ember.$('.receive-options.' + package1.id).attr('class').includes('hidden'), true);
  });
});
