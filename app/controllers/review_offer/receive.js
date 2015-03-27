import Ember from 'ember';

export default Ember.ObjectController.extend({
  queryParams: ["state"],
  state: "expecting",

  items: function(key, value) {
    return arguments.length > 1 ? value : this.getItems();
  }.property("state", "model.items.[]"),

  getItems: function() {
    return this.get("model.items").filter(i => {
      return i.get("packages").filterBy("state", this.get("state")).get("length") > 0;
    });
  },

  actions: {
    refresh: function() {
      this.set("items", this.getItems());
    }
  }
});
