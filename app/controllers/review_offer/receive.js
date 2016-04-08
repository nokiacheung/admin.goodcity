import Ember from "ember";

export default Ember.Controller.extend({
  queryParams: ["state"],
  state: "expecting",
  items: Ember.computed.filterBy("model.items", "state", "accepted"),

  expectingCount: Ember.computed("allPackages.@each.state", function(){
    return this.get('allPackages').filterBy("state", "expecting").length;
  }),

  receivedCount: Ember.computed("allPackages.@each.state", function(){
    return this.get('allPackages').filterBy("state", "received").length;
  }),

  missingCount: Ember.computed("allPackages.@each.state", function(){
    return this.get('allPackages').filterBy("state", "missing").length;
  }),

  allPackages: Ember.computed("items.@each.packages", function(){
    var res = [];
    this.get("items").forEach(i => res = res.concat(i.get("packages").toArray()));
    return res;
  })
});
