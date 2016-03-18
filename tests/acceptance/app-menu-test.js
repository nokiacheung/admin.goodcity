import Ember from 'ember';
import startApp from '../helpers/start-app';
import FactoryGuy from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';

var App, offer, offer1, reviewer1;

module('App Menu', {
  beforeEach: function() {
    App = startApp({}, 2);
    TestHelper.setup();

    reviewer1 = FactoryGuy.make("user", {isReviwer: true});
    window.localStorage.currentUserId = reviewer1.id;
    offer = FactoryGuy.make("offer_with_items", { state: "under_review", reviewed_by: reviewer1 });
    offer1 = FactoryGuy.make("offer_with_items", { state: "is_reviewed", reviewed_by: reviewer1 });
  },
  afterEach: function() {
    Em.run(function() { TestHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("In progress tab count", function() {
  visit("/offers/in_progress/reviewing");

  andThen(function(){
    equal(currentURL(), "/offers/in_progress/reviewing");
    equal(find('a[href="/offers/in_progress"]').text(), "In Progress (2)");
  });
});
