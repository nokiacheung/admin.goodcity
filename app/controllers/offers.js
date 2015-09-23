import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),

  newOffersCount: function() {
    return this.get('allOffers').filterBy('isSubmitted', true).length;
  }.property('allOffers.@each.isSubmitted'),

  inProgressOffersCount: function() {
    return this.get('allOffers').filterBy('isReviewing', true).length;
  }.property('allOffers.@each.isReviewing'),

  scheduledCount: function() {
    return this.get('allOffers').filterBy('isScheduled', true).length;
  }.property('allOffers.@each.isScheduled'),

  myOffersCount: function() {
    var currentUserId = this.session.get("currentUser.id");
    return this.get("allOffers")
      .filterBy("adminCurrentOffer", true)
      .filterBy("reviewedBy.id", currentUserId)
      .length;
  }.property('allOffers.@each.isReviewing'),

  allOffers: function() {
    return this.store.peekAll('offer');
  }.property(),

  actions: {
    logMeOut: function(){
      this.get('application').send('logMeOut');
    }
  }
});
