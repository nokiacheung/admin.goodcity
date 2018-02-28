import hbs from 'htmlbars-inline-precompile';
import startApp from '../helpers/start-app';
import FactoryGuy from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
// import '../helpers/custom-helpers';
import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';
// import '../factories/offer';
// import '../factories/item';
// import '../factories/packages_location';

var App, reviewer, offer1;

moduleForComponent('complete-review-offer', 'Integration | Component | complete review offer', {
  integration: true,
  beforeEach: function() {
    App = startApp({}, 2);
    TestHelper.setup();
    reviewer = FactoryGuy.make('user', { id: 3 });
    offer1 = FactoryGuy.make("offer_with_items", { state:"under_review", reviewedBy: reviewer});
    this.render(hbs`{{complete-review-offer offer=offer displayUserPrompt=true}}`);
  },
  afterEach: function() {
    Ember.run(function() { TestHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

// test("complete the offer", function(assert){
//   assert.equal(this.get('complete-review-offer.displayUserPrompt'), true);
// });
