import Ember from 'ember';
const { getOwner } = Ember;

export default Ember.Component.extend({
  hidden: true,
  packageId: null,
  store: Ember.inject.service(),
  messageBox: Ember.inject.service(),
  displayUserPrompt: false,

  isReceived: Ember.computed.equal("package.state", "received"),
  isMissing: Ember.computed.equal("package.state", "missing"),

  offer: Ember.computed('packageId', function(){
    return this.get("store").peekRecord("offer", this.get("package.offerId"));
  }),

  package: Ember.computed('packageId', function(){
    return this.get("store").peekRecord("package", this.get("packageId"));
  }),

  currentUrl: Ember.computed('packageId', function(){
    return getOwner(this).lookup("router:main").get("url");
  }),

  isFirstReceivingPackage: Ember.computed('package', function(){
    var offerPackages = this.get("offer.packages");
    return offerPackages.get("length") === offerPackages.filterBy("state", "expecting").length && !this.get("offer.isReceiving");
  }),

  updatePackage: function(action) {
    var loadingView = getOwner(this).lookup('component:loading').append();
    var pkg = this.get("package");
    action(pkg);
    pkg.save()
      .then(() => loadingView.destroy())
      .catch(error => {
        loadingView.destroy();
        var errorMessage = pkg.get("errors.firstObject.message");
        var matchFound = ["Connection error", "Dispatched"].some(v => errorMessage.indexOf(v) >= 0);
        if(matchFound) {
          this.get("messageBox").alert(pkg.get("errors.firstObject.message"), () => {
            pkg.rollbackAttributes();
          });
        } else {
          pkg.rollbackAttributes();
          throw error;
        }
      });
  },

  i18n: Ember.inject.service(),

  deliveredOptions: Ember.computed(function() { return [
    { value: "Unknown", name: this.get("i18n").t("mark_received.unknown") },
    { value: "Gogovan", name: this.get("i18n").t("mark_received.gogovan") },
    { value: "Alternate", name: this.get("i18n").t("mark_received.crossroads_truck") },
    { value: "Drop Off", name: this.get("i18n").t("mark_received.dropped_off") }
  ]; }),

  deliveredBy: Ember.computed("offer.deliveredBy", function() {
    return this.get("offer.deliveredBy");
  }),

  confirmReceivingEvent: null,

  actions: {
    toggle(hidden) {
      this.set("hidden", hidden);
    },

    checkReceiving(event) {
      if(this.get("offer.isFinished")) {
        this.get("messageBox").confirm(
          this.get("i18n").t("review_offer.confirm_receiving_message"),
          () => this.send("applyReceiving", event, false) );
      } else {
        this.send("applyReceiving", event);
      }
    },

    applyReceiving(event, allow_event=true) {
      if (!this.get("isFirstReceivingPackage") && allow_event) {
        return this.send(event);
      }
      this.set("confirmReceivingEvent", event);
      this.set("displayUserPrompt", true);
    },

    confirmReceiving() {
      var offer = this.get("offer");
      offer.set("deliveredBy", this.get("deliveredBy.value"));
      offer.set("state_event", "start_receiving");
      offer.save()
        .catch(error => { offer.rollback(); throw error; })
        .then(() => this.send(this.get("confirmReceivingEvent")));
    },

    missing() {
      if (!this.get("isMissing")) {
        this.updatePackage(p => {
          p.set("state", "missing");
          p.set("state_event", "mark_missing");
        });
      }
    },

    receive() {
      if (!this.get("isReceived")) {
        this.updatePackage(p => {
          p.set("inventoryNumber", null);
          p.set("state", "received");
          p.set("state_event", "mark_received");
        });
      }
    },

    receiveInInventory() {
      if (!this.get("isReceived")) {
        this.get('router').transitionTo("receive_package", this.get("packageId"));
      }
    }
  }
});
