import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['delivery.schedule.scheduledAt'],
  sortAscending: false,
  scheduledOffers: true
});
