import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ["unreadMessagesCount:desc", 'startReceivingAt:desc'],
  arrangedContent: Ember.computed.sort("model", "sortProperties"),

  i18n: Ember.inject.service(),
  pageTitle: Ember.computed(function() {
    return this.get("i18n").t("inbox.receiving");
  }),

  allOffers: Ember.computed(function(){
    return this.store.peekAll("offer");
  }),

  model: Ember.computed("allOffers.@each.state", function(){
    return this.get("allOffers").filterBy("isReceiving");
  })

});
