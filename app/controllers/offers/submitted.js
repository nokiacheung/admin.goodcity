import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ["unreadMessagesCount:desc", 'submittedAt:desc'],
  sortAscending: false,
  newOffers: true
});
