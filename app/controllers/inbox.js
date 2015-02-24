import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['submittedAt'],
  sortAscending: false,
  newOffers: true
});
