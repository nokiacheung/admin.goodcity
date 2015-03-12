import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ["unreadMessagesCount:desc", "reviewCompletedAt:desc"],
  arrangedContent: Ember.computed.sort("model", "sortProperties"),
});