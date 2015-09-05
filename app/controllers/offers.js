import Ember from 'ember';

export default Ember.ArrayController.extend({
  application: Ember.inject.controller(),

  newOffersCount: function() {
    return this.get('allOffers').filterBy('isSubmitted', true).length;
  }.property('allOffers.@each.isSubmitted'),

  inProgressOffersCount: function() {
    return this.get('allOffers').filterBy('isReviewing', true).length;
  }.property('allOffers.@each.isReviewing'),

  scheduledCount: function() {
    return this.get('allOffers').filterBy('isScheduled', true).length;
  }.property('allOffers.@each.isScheduled'),

  myOffersCount: function() {
    var currentUserId = this.session.get("currentUser.id");
    return this.get("allOffers")
      .filterBy("adminCurrentOffer", true)
      .filterBy("reviewedBy.id", currentUserId)
      .length;
  }.property('allOffers.@each.isReviewing'),

  allOffers: function() {
    return this.store.peekAll('offer');
  }.property(),

  unreadNotificationsCount: function() {
    return this.get('allMessages').filterBy("state", "unread").get('length');
  }.property('allMessages.@each.state'),

  allMessages: function() {
    return this.store.filter('message', function(message) {
      return message.get('state') !== 'never-subscribed';
    });
  }.property(),

  hasUnreadNotifications: function() {
    return this.get('unreadNotificationsCount') > 0;
  }.property('unreadNotificationsCount'),

  actions: {
    logMeOut: function(){
      this.get('application').send('logMeOut');
    }
  }
});
