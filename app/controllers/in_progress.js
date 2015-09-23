import Ember from 'ember';

export default Ember.Controller.extend({
  inProgress: true,

  allOffers: function() {
    return this.store.peekAll("offer");
  }.property(),

  reviewedCount: function() {
    return this.get('allOffers').filterBy('isReviewed', true).length;
  }.property('allOffers.[]'),

  underReviewCount: function() {
    return this.get('allOffers').filterBy('isUnderReview', true).length;
  }.property('allOffers.[]'),

});
