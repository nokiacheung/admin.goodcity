import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ["unreadMessagesCount:desc", "cancelledAt:desc", "receivedAt:desc", "inactiveAt:desc"],
  arrangedContent: Ember.computed.sort("model", "sortProperties"),

  displaySearchOfferMessage: true,


  allOffers: Ember.computed(function(){
    return this.store.peekAll("offer");
  }),

  model: Ember.computed("allOffers.@each.state", "session.currentUser.id", function(){
    var currentUserId = this.get('session.currentUser.id');
    var currentUser = this.store.peekRecord('user', currentUserId);

    return this.get("allOffers").filterBy("isFinished").filterBy("reviewedBy", currentUser);
  })


});
