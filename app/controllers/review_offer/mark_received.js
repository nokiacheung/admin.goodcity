import Ember from "ember";
import { translationMacro as t } from "ember-i18n";

export default Ember.Controller.extend({
  i18n: Ember.inject.service(),

  deliveredBy: function(name, value) {
    return arguments.length > 1 ? value : this.get("model.deliveryType");
  },

  deliveredOptions: [
    { value: "Unknown", label: this.get("i18n").t("mark_received.unknown") },
    { value: "Gogovan", label: this.get("i18n").t("mark_received.gogovan") },
    { value: "Alternate", label: this.get("i18n").t("mark_received.crossroads_truck") },
    { value: "Drop Off", label: this.get("i18n").t("mark_received.dropped_off") }
  ],

  promptText: t("mark_received.select"),

  actions: {
    closeOffer: function() {
      var offer = this.get("model");
      offer.set("deliveredBy", this.get("deliveredBy.value"));
      offer.set("state_event", "receive");
      offer.save()
        .then(() => this.transitionToRoute("review_offer.items"))
        .catch(error => { offer.rollback(); throw error; });
    }
  }
});
