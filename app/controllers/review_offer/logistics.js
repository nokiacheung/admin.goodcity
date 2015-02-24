import Ember from 'ember';
import AjaxPromise from './../../utils/ajax-promise';
import transportDetails from './../offer/transport_details';

export default transportDetails.extend({

  needs: ['review_offer'],

  selectedCrossroadsOption: null,
  accepted: Ember.computed.filterBy('items', 'state', 'accepted'),
  pendingItem: Ember.computed.filterBy('items', 'state', 'submitted'),

  selectedGogovanOption: function(){
    return this.get('gogovanOptions.firstObject.id');
  }.property('gogovanOptions'),

  gogovanOptions: function() {
    return this.store.all('gogovan_transport').sortBy('id');
  }.property(),

  crossroadsOptions: function() {
    return this.store.all('crossroads_transport').sortBy('name');
  }.property(),

  actions: {

    completeReview: function() {
      var gogovanOptionId = this.get('selectedGogovanOption');
      var crossroadsOptionId = this.get('selectedCrossroadsOption.id');
      var loadingView = this.container.lookup('view:loading').append();

      var offerProperties = {
        gogovan_transport_id: gogovanOptionId,
        crossroads_transport_id: crossroadsOptionId,
        state_event: 'finish_review',
        id: this.get('id') };

      var route = this;
      var url   = "/offers/" + this.get('id') + "/complete_review";

      new AjaxPromise(url, "PUT", this.get('session.authToken'), {offer: offerProperties}).then(function(data) {
        route.store.pushPayload(data);
        loadingView.destroy();
        route.transitionToRoute('review_offer.items');
      });
    },

    closeOffer: function(){
      this.get('controllers.review_offer').send('closeOffer');
      // var loadingView = this.container.lookup('view:loading').append();

      // var offerProperties = {
      //   state_event: 'close',
      //   id: this.get('id') };

      // var route = this;
      // var url   = "/offers/" + this.get('id') + "/close_offer";

      // new AjaxPromise(url, "PUT", this.get('session.authToken'), {offer: offerProperties}).then(function(data) {
      //   route.store.pushPayload(data);
      //   loadingView.destroy();
      //   route.transitionToRoute('review_offer.items');
      // });
    }
  }
});
