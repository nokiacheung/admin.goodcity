import Ember from 'ember';
import AjaxPromise from 'goodcity/utils/ajax-promise';

export default Ember.Component.extend({
  hidden: true,
  packageId: null,
  store: Ember.inject.service(),
  i18n: Ember.inject.service(),

  invalidMessage: false,

  inactiveMessage: Ember.computed(function(){
    return this.get("i18n").t("inactive_offer.message");
  }),

  actions: {

    confirmMarkOfferInactive() {
      this.sendAction("toggleAction");
      this.confirmReceiving(() => this.send("markOfferInactive"));
    },

    markOfferInactive() {
      var inactiveMessage = this.get("inactiveMessage");

      if(Ember.$.trim(inactiveMessage).length === 0) {
        this.set("invalidMessage", true);
        return ;
      }

      var loadingView = this.container.lookup('component:loading').append();

      var offer = this.get("offer");
      var url   = "/offers/" + offer.id + "/mark_inactive";

      new AjaxPromise(url, "PUT", this.get('session.authToken'), { offer: { inactive_message: inactiveMessage }})
        .then(data => {
          this.get("store").pushPayload(data);
        })
        .finally(() => {
          loadingView.destroy();
          this.closeConfirmBox();
        });

    }

  },

  confirmReceiving: function(successCallback) {
    var _this = this;
    Ember.$("#confirmOfferInactiveModal").removeClass("open");
    Ember.$("#confirmOfferInactiveModal").foundation("reveal", "open");
    Ember.$(".loading-indicator").remove();

    Ember.$("#confirmOfferInactiveModal .closeLink").click(() => {
      _this.closeConfirmBox();
    });

    Ember.$("#confirmOfferInactiveModal .confirmLink").click(() => {
      successCallback();
    });
  },

  closeConfirmBox: function() {
    Ember.run.next(function() {
      Ember.$("#confirmOfferInactiveModal").foundation("reveal", "close");
    });
  },
});
