import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ["unreadMessagesCount:desc", 'submittedAt:desc'],
  arrangedContent: Ember.computed.sort("model", "sortProperties"),
  newOffers: true
});
