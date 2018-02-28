import { test, moduleForComponent } from 'ember-qunit';
import startApp from '../../helpers/start-app';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import Ember from 'ember';
// import '.../factories/holiday';
import FactoryGuy from 'ember-data-factory-guy';
import hbs from 'htmlbars-inline-precompile';

var App, holidays;

moduleForComponent('add-holiday', 'Integration | Component | add holiday', {
  integration: true,
  beforeEach: function() {
    App = startApp({}, 2);
    TestHelper.setup();
    holidays = [FactoryGuy.make("holiday")];
    this.render(hbs`{{add-holiday allHolidays=holidays}}`);
  },
  afterEach: function() {
    Ember.run(function() { TestHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("displayAddHolidayForm set displayUserPrompt to true", function(assert){
  assert.equal(this.$("#message-box").attr('isVisible'), true);
});
