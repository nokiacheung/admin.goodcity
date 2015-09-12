import Ember from "ember";

export default Ember.TextField.extend({
  tagName: "input",
  type:    "text",
  attributeBindings: [ "name", "id", "value", 'placeholder'],

  becomeFocused: function() {
    this.$().focus();
  }.on('didInsertElement'),
<<<<<<< HEAD
});
=======
});
>>>>>>> moved search-view to component
