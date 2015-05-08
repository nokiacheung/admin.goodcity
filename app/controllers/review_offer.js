import Ember from 'ember';
import AjaxPromise from './../utils/ajax-promise';
import OfferBaseController from "shared.goodcity/controllers/offer_base";

export default OfferBaseController.extend({
  offer: Ember.computed.alias('model'),
  isStartReviewClicked: false,

  offerReadyForClosure: function() {
    return this.get("model.state") !== "received" &&
      this.get("model.packages.length") > 0 &&
      this.get("model.packages").filterBy("state", "expecting").get("length") === 0;
  }.property("model.state", "model.packages.@each.state"),

  actions: {
    startReview: function() {
      if(this.get("isStartReviewClicked")) { return; }
      var offer = this.store.getById('offer', this.get('offer.id'));
      this.set("isStartReviewClicked", true);
      var adapter = this.container.lookup('adapter:application');
      var url = adapter.buildURL('offer', offer.get('id')) + '/review';

      adapter.ajax(url, 'PUT')
        .then(data => this.store.pushPayload(data))
        .finally(() => this.set("isStartReviewClicked", false));
    },

    closeOffer: function(){
      var loadingView = this.container.lookup('view:loading').append();
      var offerId = this.get('model.id');
      var offerProperties = {id: offerId, state_event: 'close'};
      var url = "/offers/" + offerId + "/close_offer";

      new AjaxPromise(url, "PUT", this.get('session.authToken'), {offer: offerProperties})
        .then(data => {
          this.store.pushPayload(data);
          this.transitionToRoute('review_offer.items');
        })
        .finally(() => loadingView.destroy());
    }
  }
});
