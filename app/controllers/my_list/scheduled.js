import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ["unreadMessagesCount:desc", "delivery.schedule.scheduledAt:desc"],
  arrangedContent: Ember.computed.sort("model", "sortProperties"),
});
