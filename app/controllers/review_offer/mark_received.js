import Ember from "ember";
import { translationMacro as t } from "ember-i18n";

export default Ember.Controller.extend({
  i18n: Ember.inject.service(),

  deliveredBy: Ember.computed({
    get: function() {
      return this.get("model.deliveryType");
    },
    set: function(key, value) {
      return value;
    }
  }),

  deliveredOptions: null,

  initController: Ember.on('init', function() {
    this.set("deliveredOptions", [
      { value: "Unknown", label: this.get("i18n").t("mark_received.unknown") },
      { value: "Gogovan", label: this.get("i18n").t("mark_received.gogovan") },
      { value: "Alternate", label: this.get("i18n").t("mark_received.crossroads_truck") },
      { value: "Drop Off", label: this.get("i18n").t("mark_received.dropped_off") }
    ]);
  }),

  promptText: t("mark_received.select"),

  actions: {
    closeOffer() {
      var offer = this.get("model");
      offer.set("deliveredBy", this.get("deliveredBy.value"));
      offer.set("state_event", "receive");
      offer.save()
        .then(() => this.transitionToRoute("review_offer.items"))
        .catch(error => { offer.rollback(); throw error; });
    }
  }
});
