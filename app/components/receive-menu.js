import Ember from 'ember';

export default Ember.Component.extend({
  hidden: true,
  packageId: null,
  store: Ember.inject.service(),

  package: function() {
    return this.get("store").getById("package", this.get("packageId"));
  }.property("packageId"),

  updatePackage: function(action) {
    var pkg = this.get("package");
    return action(pkg).save()
      .catch(error => { pkg.rollback(); throw error; });
  },

  actions: {
    toggle: function(hidden) {
      this.set("hidden", hidden);
    },
    delete: function() {
      this.updatePackage(p => { p.deleteRecord(); return p; }).then(p => p.unloadRecord());
    },
    missing: function() {
      this.updatePackage(p => p.set("state_event", "mark_missing"));
    },
    receive: function() {
      this.updatePackage(p => p.set("state_event", "mark_received"));
    }
  }
});
