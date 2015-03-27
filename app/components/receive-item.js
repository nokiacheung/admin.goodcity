import Ember from 'ember';

export default Ember.Component.extend({
  itemId: null,
  state: null,
  store: Ember.inject.service(),

  item: function() {
    return this.get("store").getById("item", this.get("itemId"));
  }.property(),

  packages: function() {
    // if it's second time function is called it means packages array has changed
    if (this.get("loaded")) {
      this.sendAction("refresh");
    }
    this.set("loaded", true);

    return this.get("item.packages").filterBy("state", this.get("state"));
  }.property("item.packages.@each.state")
});
