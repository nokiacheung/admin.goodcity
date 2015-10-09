import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ["unreadMessagesCount:desc", 'startReceivingAt:desc'],
  arrangedContent: Ember.computed.sort("model", "sortProperties"),
  receivingOffers: true
});
