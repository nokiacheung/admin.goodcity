import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ["unreadMessagesCount:desc", "reviewedAt:desc"],
  arrangedContent: Ember.computed.sort("model", "sortProperties"),

  allOffers: Ember.computed(function(){
    return this.store.peekAll("offer");
  }),

  model: Ember.computed("allOffers.@each.state", "session.currentUser.id", function(){
    var currentUserId = this.get('session.currentUser.id');
    var currentUser = this.store.peekRecord('user', currentUserId);

    return this.get("allOffers").filterBy("isUnderReview").filterBy("reviewedBy", currentUser);
  }),
});
