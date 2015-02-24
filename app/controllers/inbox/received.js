import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['receivedAt'],
  sortAscending: false,
  receivedOffers: true
});
