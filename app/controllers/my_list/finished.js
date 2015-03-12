import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ["unreadMessagesCount:desc", "updated:desc"],
  arrangedContent: Ember.computed.sort("model", "sortProperties"),
});
