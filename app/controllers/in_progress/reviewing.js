import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ["unreadMessagesCount:desc", "reviewedAt:desc"],
  arrangedContent: Ember.computed.sort("model", "sortProperties"),
});
