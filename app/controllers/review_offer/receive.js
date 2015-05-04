import Ember from "ember";

export default Ember.Controller.extend({
  queryParams: ["state"],
  state: "expecting",
  items: Ember.computed.filterBy("model.items", "state", "accepted"),

  expectingCount: function(){
    return this.get('allPackages').filterBy("state", "expecting").length;
  }.property("allPackages.@each.state"),

  receivedCount: function(){
    return this.get('allPackages').filterBy("state", "received").length;
  }.property("allPackages.@each.state"),

  missingCount: function(){
    return this.get('allPackages').filterBy("state", "missing").length;
  }.property("allPackages.@each.state"),

  allPackages: function(){
    return this.get("model.itemPackages");
  }.property("model", "model.state"),
});
