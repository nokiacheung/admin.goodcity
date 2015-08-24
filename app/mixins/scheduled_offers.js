import Ember from 'ember';

export default Ember.Mixin.create({
  scheduleldOffers: true,

  allDeliveries: function() {
    return this.store.all("delivery");
  }.property(),

  allOffers: function() {
    return this.store.all("offer");
  }.property(),

  allValidDeliveries: function(){
    return this.get("allDeliveries").filter(d => !d.get("offer.isFinished"));
  }.property('allDeliveries.[]'),

  allValidOffers: function() {
    return this.get("allOffers").filter(d => !d.get("isFinished"));
  }.property('allOffers.[]'),

  allScheduledOffers: function() {
    this.get("allValidDeliveries"); // extra call
    return this.get("allValidOffers").filter(d => d.get("isScheduled"));
  }.property('allValidOffers.@each.isFinished', 'allValidDeliveries.[]'),

  dropOff: function() {
    return this.get('allScheduledOffers').filterBy('delivery.isDropOff');
  }.property('allScheduledOffers.@each.delivery.deliveryType'),

  collection: function() {
    return this.get('allScheduledOffers').filterBy('delivery.isAlternate');
  }.property('allScheduledOffers.@each.delivery.deliveryType'),

  ggv: function() {
    return this.get('allScheduledOffers').filterBy('delivery.isGogovan');
  }.property('allScheduledOffers.@each.delivery.deliveryType'),
});
