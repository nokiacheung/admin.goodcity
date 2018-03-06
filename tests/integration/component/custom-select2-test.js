import { test, moduleForComponent } from 'ember-qunit';
import startApp from '../../helpers/start-app';
import FactoryGuy from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

var App, locations, location;

moduleForComponent('radio-text-input', 'Integration | Component | radio text input', {
  integration: true,
  beforeEach: function() {
    App = startApp({}, 2);
    TestHelper.setup();
    location = FactoryGuy.make("location");
    locations = [location];
    this.render(hbs`{{custom-select2 content=[location] record=location recordId=location.id}}`);
  },
  afterEach: function() {
    Ember.run(function() { TestHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("check didInsert", function(assert){
  assert.equal(Boolean(this.get('isAndroidDevice')), false);
});
