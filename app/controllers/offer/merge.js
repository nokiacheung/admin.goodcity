import Ember from 'ember';
import AjaxPromise from 'goodcity/utils/ajax-promise';

export default Ember.Controller.extend({
  sortProperties: ["updatedAt:desc"],
  arrangedContent: Ember.computed.sort("offersForMerge", "sortProperties"),

  offerDonor: Ember.computed.alias("model.createdBy"),
  alert: Ember.inject.service(),

  allOffers: Ember.computed(function(){
    return this.store.peekAll("offer");
  }),

  offersForMerge: Ember.computed("allOffers.@each.state", "model", "offerDonor", function(){
    return this.get("allOffers")
      .filterBy("createdBy", this.get("offerDonor"))
      .filterBy("baseForMerge", true)
      .rejectBy("id", this.get("model.id"));
  }),

  actions: {
    confirmMergeOffer(offer) {
      this.confirmMergeOffer(() => this.send("mergeOffer", offer));
    },

    mergeOffer(baseOffer) {
      var loadingView = this.container.lookup('component:loading').append();

      var offer = this.get("model");
      var url   = "/offers/" + offer.id + "/merge_offer";

      new AjaxPromise(url, "PUT", this.get('session.authToken'), { base_offer_id: baseOffer.id })
        .then(data => {
          loadingView.destroy();
          if(data.status) {
            this.transitionToRoute("review_offer.items", baseOffer);
          } else {
            this.get("alert").show(this.get("i18n").t('offer.merge.error'));
          }
        });
    },
  },

  confirmMergeOffer: function(successCallback) {
    var _this = this;
    Ember.$("#confirmOfferMergeModal").removeClass("open");
    Ember.$("#confirmOfferMergeModal").foundation("reveal", "open");
    Ember.$(".loading-indicator").remove();

    Ember.$("#confirmOfferMergeModal .closeLink").click(() => {
      _this.closeConfirmBox();
    });

    Ember.$("#confirmOfferMergeModal .confirmLink").click(() => {
      successCallback();
      _this.closeConfirmBox();
    });
  },

  closeConfirmBox: function() {
    Ember.run.next(function() {
      Ember.$("#confirmOfferMergeModal").foundation("reveal", "close");
      Ember.$("#confirmOfferMergeModal *").unbind('click');
    });
  },

});
