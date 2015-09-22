import Ember from 'ember';

export default Ember.Component.extend({
  hidden: true,
  packageId: null,
  store: Ember.inject.service(),

  package: function() {
    return this.get("store").peekRecord("package", this.get("packageId"));
  }.property("packageId"),

  updatePackage: function(action) {
    var pkg = this.get("package");
    action(pkg);
    pkg.save()
      .catch(error => { pkg.rollback(); throw error; });
  },

  currentUrl: function() {
    return this.container.lookup("router:main").get("url");
  }.property("packageId"),

  isReceived: Ember.computed.equal("package.state", "received"),
  isMissing: Ember.computed.equal("package.state", "missing"),

  actions: {
    toggle: function(hidden) {
      this.set("hidden", hidden);
    },
    missing: function() {
      this.updatePackage(p => {
        p.set("state", "missing");
        p.set("state_event", "mark_missing");
      });
    },
    receive: function() {
      this.updatePackage(p => {
        p.set("state", "received");
        p.set("state_event", "mark_received");
      });
    }
  }
});
