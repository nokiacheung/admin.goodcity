import Ember from 'ember';
import { test, moduleForComponent } from 'ember-qunit';
import startApp from '../../helpers/start-app';

var App, component;

moduleForComponent('select-2', 'ItemTypeComponent using select2', {
  setup: function() {
    // App = startApp();
    //creation of component instance
    component = this.subject();
  },
  teardown: function() {
    // Ember.run(App, App.destroy);
    // Ember.run(component, component.destroy);
  }
});

test('it renders itemType', function() {
  expect(2);
  equal(component._state, 'preRender');
  this.append();
  equal(component._state, 'inDOM');
});

// TODO: Commented for time being as TEARDOWN has issue
// it is not destroying app for components
// fix has been added to ember-qunit but package is not released
// https://github.com/rwjblue/ember-qunit/pull/85/files

// test('it has placeholder text', function() {
//   var placeholderText = "Add item label";
//   expect(1);
//   component = this.subject();
//   component.set('placeholder', placeholderText);
//   this.append();
//   andThen(function(){
//     equal($(".select2-chosen").text(), placeholderText, "has placeholder text");
//   });
// });
