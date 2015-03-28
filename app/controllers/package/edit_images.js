import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    next: function() {
      this.transitionToRoute("review_item.accept", this.get("model.item.id"));
    }
  }
});
