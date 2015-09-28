import Ember from 'ember';

export default Ember.Controller.extend({
  myOffers: true,

  inProgressCount: Ember.computed('reviewerOffers.@each.isUnderReview', function(){
    return this.get('reviewerOffers').filterBy('isUnderReview', true).length;
  }),

  scheduledCount: Ember.computed('reviewerOffers.@each.isScheduled', function(){
    return this.get('reviewerOffers').filterBy('isScheduled', true).length;
  }),

  reviewedCount: Ember.computed('reviewerOffers.@each.isReviewed', function(){
    return this.get('reviewerOffers').filterBy('isReviewed', true).length;
  }),

  allOffers: Ember.computed(function(){
    return this.store.peekAll("offer");
  }),

  reviewerOffers: Ember.computed("session.currentUser.id", "allOffers.@each.reviewedBy", function(){
    var currentUserId = this.session.get("currentUser.id");
    return this.get("allOffers").filterBy("reviewedBy.id", currentUserId);
  }),

});

