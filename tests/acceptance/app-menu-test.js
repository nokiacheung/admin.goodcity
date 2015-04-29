import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, testHelper, offer, offer1, reviewer1,
  TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

module('App Menu', {
  setup: function() {
    App = startApp({}, 2);
    testHelper = TestHelper.setup(App);

    reviewer1 = FactoryGuy.make("user", {isReviwer: true});
    window.localStorage.currentUserId = reviewer1.id;
    offer = FactoryGuy.make("offer_with_items", { state: "under_review", reviewed_by: reviewer1 });
    offer1 = FactoryGuy.make("offer_with_items", { state: "is_reviewed", reviewed_by: reviewer1 });
  },
  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
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
