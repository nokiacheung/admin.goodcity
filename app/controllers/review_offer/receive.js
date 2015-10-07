import Ember from "ember";
import { translationMacro as t } from "ember-i18n";

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
  }),

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
  promptText: t("mark_received.select"),

  initController: Ember.on('init', function() {
    this.set("deliveredOptions", [
      { value: "Unknown", name: this.get("i18n").t("mark_received.unknown") },
      { value: "Gogovan", name: this.get("i18n").t("mark_received.gogovan") },
      { value: "Alternate", name: this.get("i18n").t("mark_received.crossroads_truck") },
      { value: "Drop Off", name: this.get("i18n").t("mark_received.dropped_off") }
    ]);
  }),

  actions: {
    startReceivingOffer() {
      var offer = this.get("model");
      offer.set("deliveredBy", this.get("deliveredBy.value"));
      offer.set("state_event", "start_receiving");
      offer.save()
        .catch(error => { offer.rollback(); throw error; });
    }
  }
});
