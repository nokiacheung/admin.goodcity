import Ember from 'ember';
import startApp from '../helpers/start-app';
import FactoryGuy from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import '../helpers/custom-helpers';
import { module, test } from 'qunit';
import '../factories/offer';
import '../factories/item';
import '../factories/packages_location';

var App, offer1, reviewer, reviewerName, offer2, item1, item2, packages_location;

module('In Review Offers', {
  beforeEach: function() {
    App = startApp({}, 2);
    TestHelper.setup();
    reviewer = FactoryGuy.make('user', { id: 3 });
    offer1 = FactoryGuy.make("offer_with_items", { state:"under_review", reviewedBy: reviewer});
    reviewerName = reviewer.get('firstName') + " " + reviewer.get('lastName');
    packages_location = FactoryGuy.make("packages_location");

    offer2 = FactoryGuy.make("offer",{state:"reviewed", reviewedBy: reviewer});
    item1 = FactoryGuy.make("item", { state:"accepted", offer: offer2 });
    item2 = FactoryGuy.make("item", { state:"rejected", offer: offer2 });
    $.mockjax({url: '/api/v1/packages_location*', type: 'GET', status: 200,responseText: {
        packages_locations: [packages_location.toJSON({includeId: true})]
      }
    });
  },
  afterEach: function() {
    Em.run(function() { TestHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("convert [click_here|transport_page] to proper link", function(assert){
  visit("/offers/"+ offer1.id +"/donor_messages");

  andThen(function(){
    fillIn('.ember-text-area', "[click here|transport_page]");
    Ember.$('.button').click();

    andThen(function(){
      assert.equal($('.my_message a').text().trim(), "hello");
    })

  });
});
