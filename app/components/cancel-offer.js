import Ember from 'ember';

export default Ember.Component.extend({
  hidden: true,
  packageId: null,
  store: Ember.inject.service(),
  i18n: Ember.inject.service(),

  selectedReason: null,
  invalidReason: false,

  displayCustomReason: Ember.computed("selectedReason", function(){
    return this.get("selectedReason.id") === "-1";
  }),

  cancellationOptions: Ember.computed(function(){
    var reasons = this.get("store").peekAll('cancellation_reason').sortBy('id');
    reasons.push({id: "-1", name: this.get("i18n").t("other") });
    return reasons;
  }),

  actions: {

    confirmCancelOffer() {
      this.sendAction("toggleAction");
      this.confirmReceiving(() => this.send("cancelOffer"));
    },

    cancelOffer() {
      var cancelReason, selectedReason;

      if(this.get("displayCustomReason")) {
        cancelReason = this.get("offer.cancelReason");
        if(Ember.$.trim(cancelReason).length === 0) {
          this.set("invalidReason", true);
          return ;
        }
        this.set("invalidReason", false);
      } else {
        selectedReason = this.get("selectedReason");
      }
      var loadingView = this.container.lookup('component:loading').append();
      var offer = this.get("offer");
      offer.set("cancelReason", cancelReason);
      offer.set("cancellationReason", selectedReason);
      offer.set("state_event", "cancel");

      offer.save().finally(() => {
        loadingView.destroy();
        this.closeConfirmBox();
      });
    }

  },

  confirmReceiving: function(successCallback) {
    var _this = this;
    Ember.$("#confirmOfferCancelModal").removeClass("open");
    Ember.$("#confirmOfferCancelModal").foundation("reveal", "open");
    Ember.$(".loading-indicator").remove();

    Ember.$("#confirmOfferCancelModal .closeLink").click(() => {
      _this.closeConfirmBox();
    });

    Ember.$("#confirmOfferCancelModal .confirmLink").click(() => {
      successCallback();
    });
  },

  closeConfirmBox: function() {
    Ember.run.next(function() {
      Ember.$("#confirmOfferCancelModal").foundation("reveal", "close");
      Ember.$("#confirmOfferCancelModal *").unbind('click');
    });
  },
});
