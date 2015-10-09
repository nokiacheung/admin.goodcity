import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ["unreadMessagesCount:desc", "cancelledAt:desc", "receivedAt:desc"],
  arrangedContent: Ember.computed.sort("model", "sortProperties"),
});
