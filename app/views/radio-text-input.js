import Ember from "ember";

export default Ember.TextField.extend({
  tagName: "input",
  type:    "text",
  name:    "userName",
  attributeBindings: [ "name", "type", "id", "value", 'pattern'],

  focusIn: function() {
    this.get('parentView.controller').send('setRejectOption');
  }
});

