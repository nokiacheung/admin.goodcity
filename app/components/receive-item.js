import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "li",
  classNameBindings: ["hidden"],
  itemId: null,
  state: null,
  store: Ember.inject.service(),
  hidden: Ember.computed.empty("packages"),
  hasMultiplePackages: Ember.computed.gte("packages.length", 2),

  item: function() {
    return this.get("store").getById("item", this.get("itemId"));
  }.property("itemId"),

  packages: function() {
    return this.get("item.packages").filterBy("state", this.get("state"));
  }.property("state", "item", "item.packages.@each.state")
});
