import Ember from 'ember';

export default Ember.ObjectController.extend({
  formData: function() {
    return {
      donorConditionId: this.get("donorConditionId"),
      donorDescription: this.get("donorDescription")
    };
  }.property("model"),

  actions: {
     submitItem: function() {
      var _this = this;
      if (this.get("state") === "draft") {
        this.set("state_event", "submit");
      }
      var loadingView = this.container.lookup('view:loading').append();
      this.setProperties(this.get("formData"));
      this.get("model").save().then(function() {
        _this.set("state_event", null);
        _this.transitionToRoute('offer.offer_details');
      }).finally(function() {
        loadingView.destroy();
      });
    }
  }
});
