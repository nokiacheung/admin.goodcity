import Ember from 'ember';
import AjaxPromise from './../utils/ajax-promise';

export default Ember.ObjectController.extend({
  offer: Ember.computed.alias('model'),
  isStartReviewClicked: false,

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
      var offerProperties = {id: this.get('id'), state_event: 'close'};
      var url = "/offers/" + this.get('id') + "/close_offer";

      new AjaxPromise(url, "PUT", this.get('session.authToken'), {offer: offerProperties})
        .then(data => {
          this.store.pushPayload(data);
          this.transitionToRoute('review_offer.items');
        })
        .finally(() => loadingView.destroy());
    }
  }
});
