import Ember from 'ember';

export default Ember.ArrayController.extend({
  scheduleldOffers: true,

  allDeliveries: function() {
    return this.store.all("delivery");
  }.property(),

  allOffers: function() {
    return this.store.all("offer");
  }.property(),

  allValidOffers: function() {
    return this.get("allOffers").filter(d => !d.get("isFinished"));
  }.property('allOffers.[]'),

  scheduledDeliveries: function() {
    this.get('allValidOffers'); // extra call to observe valid-offers
    return this.get("allDeliveries").filter(d => d.get("offer.isScheduled"));
  }.property('allValidOffers.@each.isFinished', 'allDeliveries.[]'),

  collectionCount: function() {
    return this.get('scheduledDeliveries').filterBy('isAlternate').length;
  }.property('scheduledDeliveries.@each.deliveryType'),

  ggvCount: function() {
    return this.get('scheduledDeliveries').filterBy('isGogovan').length;
  }.property('scheduledDeliveries.@each.deliveryType'),

  dropOffCount: function() {
    return this.get('scheduledDeliveries').filterBy('isDropOff').length;
  }.property('scheduledDeliveries.@each.deliveryType'),
});
