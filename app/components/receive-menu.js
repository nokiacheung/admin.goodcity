import Ember from 'ember';

export default Ember.Component.extend({
  hidden: true,
  packageId: null,
  store: Ember.inject.service(),

  isReceived: Ember.computed.equal("package.state", "received"),
  isMissing: Ember.computed.equal("package.state", "missing"),

  package: Ember.computed('packageId', function(){
    return this.get("store").peekRecord("package", this.get("packageId"));
  }),

  currentUrl: Ember.computed('packageId', function(){
    return this.container.lookup("router:main").get("url");
  }),

  updatePackage: function(action) {
    var pkg = this.get("package");
    action(pkg);
    pkg.save()
      .catch(error => { pkg.rollback(); throw error; });
  },

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
