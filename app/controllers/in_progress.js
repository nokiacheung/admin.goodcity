import Ember from 'ember';

export default Ember.Controller.extend({
  inProgress: true,

  allOffers: Ember.computed(function(){
    return this.store.peekAll("offer");
  }),

  reviewedCount: Ember.computed('allOffers.[]', function(){
    return this.get('allOffers').filterBy('isReviewed', true).length;
  }),

  underReviewCount: Ember.computed('allOffers.[]', function(){
    return this.get('allOffers').filterBy('isUnderReview', true).length;
  }),

});
