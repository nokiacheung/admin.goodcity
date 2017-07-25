import Ember from "ember";

export default Ember.TextField.extend({
  tagName: "input",
  type:    "text",
  attributeBindings: [ "name", "id", "value", 'disabled', 'placeholder'],
  disabled: false,

  click() {
    Ember.$(this.element).closest("li").find("input[type='radio']").prop('checked', true);
  }
});
