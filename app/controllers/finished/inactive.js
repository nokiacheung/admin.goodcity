import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ["unreadMessagesCount:desc", "inactiveAt:desc"],
  arrangedContent: Ember.computed.sort("model", "sortProperties"),

  displaySearchOfferMessage: true,

  allOffers: Ember.computed(function(){
    return this.store.peekAll("offer");
  }),

  model: Ember.computed("allOffers.@each.state", function(){
    return this.get("allOffers").filterBy("isInactive");
  })

});
