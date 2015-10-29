import Ember from 'ember';

export default Ember.Component.extend({
  hidden: true,
  packageId: null,
  store: Ember.inject.service(),

  isReceived: Ember.computed.equal("package.state", "received"),
  isMissing: Ember.computed.equal("package.state", "missing"),

  offer: Ember.computed('packageId', function(){
    return this.get("store").peekRecord("offer", this.get("package.offerId"));
  }),

  package: Ember.computed('packageId', function(){
    return this.get("store").peekRecord("package", this.get("packageId"));
  }),

  currentUrl: Ember.computed('packageId', function(){
    return this.container.lookup("router:main").get("url");
  }),

  isFirstReceivingPackage: Ember.computed('package', function(){
    var offerPackages = this.get("offer.packages");
    return offerPackages.get("length") === offerPackages.filterBy("state", "expecting").length;
  }),

  updatePackage: function(action) {
    var pkg = this.get("package");
    action(pkg);
    pkg.save()
      .catch(error => { pkg.rollback(); throw error; });
  },

  actions: {
    toggle(hidden) {
      this.set("hidden", hidden);
    },

    missing() {
      if(this.get("isFirstReceivingPackage")) {
        this.confirmReceiving(() => this.send("missingPackage"));
      } else {
        this.send("missingPackage");
      }
    },

    receive() {
      if(this.get("isFirstReceivingPackage")) {
        this.confirmReceiving(() => this.send("receivePackage"));
      } else {
        this.send("receivePackage");
      }
    },

    missingPackage() {
      this.updatePackage(p => {
        p.set("state", "missing");
        p.set("state_event", "mark_missing");
      });
    },

    receivePackage() {
      this.updatePackage(p => {
        p.set("state", "received");
        p.set("state_event", "mark_received");
      });
    },
  },

  confirmReceiving: function(successCallback) {
    var _this = this;
    Ember.$("#confirmReceivingModal").removeClass("open");

    Ember.$("#confirmReceivingModal").foundation("reveal", "open");
    Ember.$(".loading-indicator").remove();

    Ember.$("#confirmReceivingModal .closeLink").click(() => {
      _this.closeConfirmBox();
    });

    Ember.$("#confirmReceivingModal .confirmLink").click(() => {
      _this.closeConfirmBox();
      successCallback();
    });
  },

  closeConfirmBox: function() {
    Ember.run.next(function() {
      Ember.$("#confirmReceivingModal").foundation("reveal", "close");
    });
  }
});
