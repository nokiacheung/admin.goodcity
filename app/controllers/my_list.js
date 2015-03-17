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

  allOffers: function() {
    return this.store.all("offer");
  }.property(),

  reviewerOffers: function() {
    var currentUserId = this.session.get("currentUser.id");
    return this.get("allOffers").filterBy("reviewedBy.id", currentUserId);
  }.property("session.currentUser.id", "allOffers.@each.reviewedBy"),

});

