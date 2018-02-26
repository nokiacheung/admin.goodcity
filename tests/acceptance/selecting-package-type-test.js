import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import '../factories/offer';
import '../factories/item';
import '../factories/package';
import FactoryGuy from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';

var App, offer, item1, item2, package1, package2, packageType;

module('Reviewer: Accept Item Tab', {
  beforeEach: function() {
    App = startApp({}, 2);
    TestHelper.setup();

    offer = FactoryGuy.make("offer", { state:"under_review"});
    item1 = FactoryGuy.make("item_with_type", { state: "accepted"});
    item2 = FactoryGuy.make("item", { offer: offer});
    packageType = item1.get('packageType');
    package1 = FactoryGuy.make("package", { item: item1, packageType: packageType});
    package2 = FactoryGuy.make("package", { item: item1, packageType: packageType});

    $.mockjax({url: '/api/v1/package_types', type: 'GET', status: 200, responseText: {
        package_types: [packageType.toJSON({includeId: true})]
      }
    });
  },

  afterEach: function() {
    Em.run(function() { TestHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("selecting package-type popup default sub package type", function(assert){
  assert.expect(2);

  visit("/offers/" + offer.id + "/review_item/" + item1.id + "/accept");
  andThen(function() {
    assert.equal($('.item_lable_input input').val(), item1.get('packageType.name'));
    assert.equal($('.detail_container div label select').val(), item1.get('packageType.id'));
  });
});
