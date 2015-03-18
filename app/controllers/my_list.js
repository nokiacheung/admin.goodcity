import Ember from 'ember';

export default Ember.ArrayController.extend({
  myOffers: true,

  inProgressCount: function() {
    return this.get('reviewerOffers').filterBy('isUnderReview', true).length;
  }.property('reviewerOffers.@each.isUnderReview'),

  scheduledCount: function() {
    return this.get('reviewerOffers').filterBy('isScheduled', true).length;
  }.property('reviewerOffers.@each.isScheduled'),

  reviewedCount: function() {
    return this.get('reviewerOffers').filterBy('isReviewed', true).length;
  }.property('reviewerOffers.@each.isReviewed'),

  reviewerOffers: function() {
    return this.get('currentUser.reviewedOffers');
  }.property('session.currentUser.reviewedOffers.@each'),

  currentUser: function() {
    var currentUserId = this.session.get("currentUser.id");
    return this.store.getById('user', currentUserId);
  }.property('session.currentUser'),

});

