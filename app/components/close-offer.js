import Ember from 'ember';
import AjaxPromise from 'goodcity/utils/ajax-promise';
const { getOwner } = Ember;

export default Ember.Component.extend({

  store: Ember.inject.service(),
  i18n: Ember.inject.service(),
  loadCloseOfferForm: true,

  invalidMessage: Ember.computed({
    get() {
      return false;
    },
    set(key, value) {
      return value;
    }
  }),

  closeMessage: Ember.computed({
    get() {
      return this.get("i18n").t("review_offer.close_offer_message").string;
    },
    set(key, value) {
      return value;
    }
  }),

  actions: {

    confirmCloseOffer() {
      this.confirmCloseOffer(() => this.send("closeOffer"));
    },

    closeOffer() {
      var closeOfferMessage = this.get("closeMessage") || "";

      if(closeOfferMessage.trim().length === 0) {
        this.set("invalidMessage", true);
        return false;
      }

      this.set("invalidMessage", false);

      var loadingView = getOwner(this).lookup('component:loading').append();
      var offerId = this.get('offerId');

      var url = "/offers/" + offerId + "/close_offer";

      new AjaxPromise(url, "PUT", this.get('session.authToken'), { close_offer_message: closeOfferMessage })
        .then(data => {
          this.get("store").pushPayload(data);
        })
        .finally(() => {
          this.closeConfirmBox();
          loadingView.destroy();
        });
    },
  },

  confirmCloseOffer: function(successCallback) {
    var _this = this;
    Ember.$("#confirmOfferCloseModal").removeClass("open");
    Ember.$("#confirmOfferCloseModal").foundation("reveal", "open");
    Ember.$(".loading-indicator").remove();

    Ember.$("#confirmOfferCloseModal .closeLink").click(() => {
      _this.closeConfirmBox();
    });

    Ember.$("#confirmOfferCloseModal .confirmLink").click(() => {
      successCallback();
    });
  },

  closeConfirmBox: function() {
    Ember.run.next(function() {
      Ember.$("#confirmOfferCloseModal").foundation("reveal", "close");
      Ember.$("#confirmOfferCloseModal *").unbind('click');
    });
  },

});
