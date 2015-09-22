import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "li",
  classNameBindings: ["hidden"],
  itemId: null,
  pState: null, // experienced initial value of 'inBuffer' on staging if name is state
  store: Ember.inject.service(),
  hidden: Ember.computed.empty("packages"),
  hasMultiplePackages: Ember.computed.gte("packages.length", 2),

  item: function() {
    return this.get("store").peekRecord("item", this.get("itemId"));
  }.property("itemId"),

  packages: function() {
    return this.get("item.packages").filterBy("state", this.get("pState"));
  }.property("pState", "item", "item.packages.@each.state")
});
