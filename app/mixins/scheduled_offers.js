import Ember from 'ember';

export default Ember.Mixin.create({
  scheduledOffers: true,

  allDeliveries: Ember.computed(function(){
    return this.store.peekAll("delivery");
  }),

  allOffers: Ember.computed(function(){
    return this.store.peekAll("offer");
  }),

  allValidDeliveries: Ember.computed('allDeliveries.[]', function(){
    return this.get("allDeliveries").filter(d => !d.get("offer.isFinished"));
  }),

  allValidOffers: Ember.computed('allOffers.[]', function(){
    return this.get("allOffers").filter(d => !d.get("isFinished"));
  }),

  allScheduledOffers: Ember.computed('allValidOffers.@each.isFinished', 'allValidDeliveries.[]', function(){
    this.get("allValidDeliveries"); // extra call
    return this.get("allValidOffers").filter(d => d.get("isScheduled"));
  }),

  dropOff: Ember.computed('allScheduledOffers.@each.delivery.deliveryType', function(){
    return this.get('allScheduledOffers').filterBy('delivery.isDropOff');
  }),

  collection: Ember.computed('allScheduledOffers.@each.delivery.deliveryType', function(){
    return this.get('allScheduledOffers').filterBy('delivery.isAlternate');
  }),

  ggv: Ember.computed('allScheduledOffers.@each.delivery.deliveryType', function(){
    return this.get('allScheduledOffers').filterBy('delivery.isGogovan');
  }),
});
