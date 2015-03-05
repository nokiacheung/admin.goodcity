import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: ['application'],

  newOffersCount: Ember.computed.alias('model.length'),

  inProgressCount: function() {
    return this.get('allOffers').filterBy('isUnderReview', true).length;
  }.property('allOffers.@each.isUnderReview'),

  scheduledCount: function() {
    return this.get('allOffers').filterBy('isScheduled', true).length;
  }.property('allOffers.@each.isScheduled'),

  myOffersCount: function() {
    var currentUserId = this.session.get("currentUser.id");
    var currentUser = this.store.getById('user', currentUserId);
    return this.get('allOffers').filterBy('reviewedBy', currentUser).filterBy('isReviewing', true).length;
  }.property('allOffers.@each.isReviewing'),

  allOffers: function() {
    return this.store.all('offer');
  }.property('model.@each'),

  actions: {
    logMeOut: function(){
      this.get('controllers.application').send('logMeOut');
    }
  }
});
