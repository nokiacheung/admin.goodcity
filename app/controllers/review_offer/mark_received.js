import Ember from "ember";

export default Ember.Controller.extend({
  deliveredBy: function(name, value) {
    return arguments.length > 1 ? value : this.get("model.deliveryType");
  },

  deliveredOptions: [
    { value: "Unknown", label: Ember.I18n.t("mark_received.unknown") },
    { value: "Gogovan", label: Ember.I18n.t("mark_received.gogovan") },
    { value: "Alternate", label: Ember.I18n.t("mark_received.crossroads_truck") },
    { value: "Drop Off", label: Ember.I18n.t("mark_received.dropped_off") }
  ],

  promptText: Ember.I18n.t("mark_received.select"),

  actions: {
    closeOffer: function() {
      var offer = this.get("model");
      offer.set("deliveredBy", this.get("deliveredBy"));
      offer.set("state_event", "receive");
      offer.save()
        .then(() => this.transitionToRoute("review_offer.items"))
        .catch(error => { offer.rollback(); throw error; });
    }
  }
});
