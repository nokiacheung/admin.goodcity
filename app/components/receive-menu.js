import Ember from 'ember';

export default Ember.Component.extend({
  hidden: true,
  templateName: "review_offer/receive_menu",
  packageId: null,
  store: Ember.inject.service(),

  package: function() {
    return this.get("store").getById("package", this.get("packageId"));
  }.property("packageId"),

  updatePackage: function(action) {
    var pkg = this.get("package");
    action(pkg).save()
      .catch(error => { pkg.rollback(); throw error; });
  },

  actions: {
    toggle: function(hidden) {
      this.set("hidden", hidden);
    },
    delete: function() {
      this.updatePackage(p => p.deleteRecord());
    },
    missing: function() {
      this.updatePackage(p => p.set("state_event", "mark_missing"));
    },
    receive: function() {
      this.updatePackage(p => p.set("state_event", "mark_received"));
    }
  }
});
