import Ember from 'ember';

export default Ember.Controller.extend({
  i18n: Ember.inject.service(),

  pageTitle: Ember.computed(function() {
    return this.get("i18n").t("inbox.in_review");
  }),

  allOffers: Ember.computed(function(){
    return this.store.peekAll("offer");
  }),

  reviewedCount: Ember.computed('allOffers.@each.isReviewed', function(){
    return this.get('allOffers').filterBy('isReviewed', true).length;
  }),

  underReviewCount: Ember.computed('allOffers.@each.isUnderReview', function(){
    return this.get('allOffers').filterBy('isUnderReview', true).length;
  }),

});
