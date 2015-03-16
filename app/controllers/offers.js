import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: ['application'],

  newOffersCount: function() {
    return this.get('allOffers').filterBy('isSubmitted', true).length;
  }.property('allOffers.@each.isSubmitted'),


  inProgressCount: function() {
    return this.get('allOffers').filterBy('isUnderReview', true).length;
  }.property('allOffers.@each.isUnderReview'),

  scheduledCount: function() {
    return this.get('allOffers').filterBy('isScheduled', true).length;
  }.property('allOffers.@each.isScheduled'),

  myOffersCount: function() {
    var currentUserId = this.session.get("currentUser.id");
    var currentUser = this.store.getById('user', currentUserId);
    return currentUser.get('reviewedOffers').length;
  }.property('allOffers.@each.isReviewing'),

  allOffers: function() {
    return this.store.all('offer');
  }.property('model.@each'),

  unreadNotificationsCount: function() {
    return this.get('allMessages').filterBy("state", "unread").get('length');
  }.property('allMessages.@each.state'),

  allMessages: function() {
    return this.store.filter('message', function(message) {
      return message.get('state') !== 'never-subscribed';
    });
  }.property(''),

  hasUnreadNotifications: function() {
    return this.get('unreadNotificationsCount') > 0;
  }.property('allMessages.@each.state'),

  actions: {
    logMeOut: function(){
      this.get('controllers.application').send('logMeOut');
    }
  }
});
