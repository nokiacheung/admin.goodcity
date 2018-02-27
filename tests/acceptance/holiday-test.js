import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import '../factories/offer';
import '../factories/item';
import '../factories/package';
import FactoryGuy from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';

var App, holiday;

module('Reviewer: Accept Item Tab', {
  beforeEach: function() {
    App = startApp({}, 2);
    TestHelper.setup();

    holiday = FactoryGuy.make("holiday");
  },

  afterEach: function() {
    Em.run(function() { TestHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("add-holiday displayUserPrompt", function(assert){
  visit("/holidays");
  andThen(function(){
    click(find("a:contains('Add')"));
    andThen(function(){
      assert.equal($("#message-box").attr('isVisible'), true);
    });
  });
});

// test("resetForm sets false inValidName and invalidDate", function(assert){
//   this.render(hbs`{{add-holiday allHolidays=holidays}}`);
//   assert.equal(this.$("#message-box").attr('isVisible'), true);
// });
