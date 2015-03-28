import Ember from "ember";

export default Ember.ObjectController.extend({
  queryParams: ["state"],
  state: "expecting",
  items: Ember.computed.filterBy("model.items", "state", "accepted")
});
