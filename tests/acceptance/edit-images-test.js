import Ember from 'ember';
import startApp from '../helpers/start-app';
import FactoryGuy from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';

var App, offer;

module('Add new Item', {
  setup: function() {
    App = startApp({}, 2);
    TestHelper.setup();
    offer = FactoryGuy.make("offer_with_items", { state:"under_review"});
  },
  teardown: function() {
    Em.run(function() { TestHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("create without Image", function() {
  visit("/offers/"+ offer.id +"/items/new/edit_images");

  andThen(function(){
    equal($(".noImage a:contains('Cannot provide photo')").length, 1);
    click(find("a:contains('Cannot provide photo')"));
      andThen(function(){
        equal(currentURL(), "/offers/101/review_item/3/accept");
      });
  });
});
