import Ember from 'ember';

export default Ember.ArrayController.extend({

  inProgress: true,

  inProgressCount: function() {
    return this.get('allOffers').filterBy('isUnderReview', true).length;
  }.property('allOffers.@each.isUnderReview'),

  reviewedCount: function() {
    return this.get('allOffers').filterBy('isReviewed', true).length;
  }.property('allOffers.@each.isReviewed'),

  allOffers: function() {
    return this.store.all('offer');
  }.property('model.@each'),

});
