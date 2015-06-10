import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, offer , testHelper,
  TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

module('Add new Item', {
  setup: function() {
    App = startApp({}, 2);
    testHelper = TestHelper.setup(App);
    offer = FactoryGuy.make("offer_with_items", { state:"under_review"});
  },
  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
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
