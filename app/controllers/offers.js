import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),

  newOffersCount: Ember.computed('allOffers.@each.isSubmitted', function(){
    return this.get('allOffers').filterBy('isSubmitted', true).length;
  }),

  inProgressOffersCount: Ember.computed('allOffers.@each.isReviewing', function(){
    return this.get('allOffers').filterBy('isReviewing', true).length;
  }),

  scheduledCount: Ember.computed('allOffers.@each.isScheduled', function(){
    return this.get('allOffers').filterBy('isScheduled', true).length;
  }),

  myOffersCount: Ember.computed('allOffers.@each.isReviewing', function(){
    var currentUserId = this.session.get("currentUser.id");
    return this.get("allOffers")
      .filterBy("adminCurrentOffer", true)
      .filterBy("reviewedBy.id", currentUserId)
      .length;
  }),

  allOffers: Ember.computed(function(){
    return this.store.peekAll('offer');
  }),

  actions: {
    logMeOut() {
      this.get('application').send('logMeOut');
    }
  }
});
