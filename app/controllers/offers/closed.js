import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['updatedAt'],
  sortAscending: false,
  closedOffers: true
});
