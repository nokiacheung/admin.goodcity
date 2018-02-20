import Ember from 'ember';
import startApp from '../helpers/start-app';
import FactoryGuy from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import '../helpers/custom-helpers';
import { module, test } from 'qunit';
import '../factories/offer';
import '../factories/item';
import '../factories/packages_location';

var App, offer1, reviewer, reviewerName, item1, item2, packages_location;

module('In Review Offers', {
  beforeEach: function() {
    App = startApp({}, 2);
    TestHelper.setup();
    reviewer = FactoryGuy.make('user', { id: 3 });
    offer1 = FactoryGuy.make("offer", { state:"under_review", reviewedBy: reviewer});
    item1 = FactoryGuy.make("item", { state:"accepted", offer: offer1 });
    item2 = FactoryGuy.make("item", { state:"accepted", offer: offer1 });
    reviewerName = reviewer.get('firstName') + " " + reviewer.get('lastName');
    packages_location = FactoryGuy.make("packages_location");

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

test("check offer-messages replace [click_here|transport] to click_here link", function(assert) {
  assert.expect(2);
  visit('/offers/' + offer1.id + "/supervisor_messages")

  andThen(function() {
    assert.equal(currentURL(), "/offers/" + offer1.id + "/supervisor_messages");
    andThen(function(){
      fillIn('.ember-text-area', "[click here|transport_page]");
      andThen(function(){
        click('.ember-view button');
        andThen(function(){
          assert.equal($('.message_details:last').parent().text().trim().split(" ").splice(-1)[0], "click here");
        })
      });
    });
  });
});
