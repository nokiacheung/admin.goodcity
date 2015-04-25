import Ember from "ember";

export default Ember.Controller.extend({
  donor: null,

  offersCount: function() {
    return this.get("model.length") + 1;
  }.property('model.length')
});
