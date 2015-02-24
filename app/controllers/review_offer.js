import Ember from 'ember';
import AjaxPromise from './../utils/ajax-promise';

export default Ember.ObjectController.extend({
  offer: Ember.computed.alias('model'),
  isStartReviewClicked: false,

  actions: {
    startReview: function() {
      if(this.get("isStartReviewClicked")) { return; }
      var _this = this;
      var offer = this.store.getById('offer', this.get('offer.id'));
      this.set("isStartReviewClicked", true);
      var adapter = this.container.lookup('adapter:application');
      var url = adapter.buildURL('offer', offer.get('id')) + '/review';
      var controller = this;

      adapter.ajax(url, 'PUT').then(function(response) {
        _this.set("isStartReviewClicked", false);
        controller.store.pushPayload(response);
      });
    },

    closeOffer: function(){
      var loadingView = this.container.lookup('view:loading').append();

      var offerProperties = {
        state_event: 'close',
        id: this.get('id') };

      var route = this;
      var url   = "/offers/" + this.get('id') + "/close_offer";

      new AjaxPromise(url, "PUT", this.get('session.authToken'), {offer: offerProperties}).then(function(data) {
        route.store.pushPayload(data);
        loadingView.destroy();
        route.transitionToRoute('review_offer.items');
      });
    }
  }
});
