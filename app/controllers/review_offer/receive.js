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
      return this.get("model.delivery.deliveryType");
    },
    set: function(key, value) {
      return value;
    }
  }),

  deliveredOptions: null,
  promptText: t("mark_received.select"),

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
