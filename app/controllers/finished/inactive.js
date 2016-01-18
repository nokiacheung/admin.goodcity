import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ["unreadMessagesCount:desc"],
  arrangedContent: Ember.computed.sort("model", "sortProperties"),
});
