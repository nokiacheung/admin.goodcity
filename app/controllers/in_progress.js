import Ember from 'ember';

export default Ember.ArrayController.extend({
  inProgress: true,

  allOffers: function() {
    return this.store.all("offer");
  }.property(),

  reviewedCount: function() {
    return this.get('allOffers').filterBy('isReviewed', true).length;
  }.property('allOffers.[]'),

  underReviewCount: function() {
    return this.get('allOffers').filterBy('isUnderReview', true).length;
  }.property('allOffers.[]'),

});
