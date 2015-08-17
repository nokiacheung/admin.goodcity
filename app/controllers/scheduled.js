import Ember from 'ember';

export default Ember.ArrayController.extend({
  scheduleldOffers: true,

  allDeliveries: function() {
    return this.store.all("delivery").filter(function(delivery){
      return delivery.get("offer.isScheduled");
    });
  }.property(),

  collectionCount: function() {
    return this.get('allDeliveries').filterBy('isAlternate', true).length;
  }.property('allDeliveries.@each.deliveryType'),

  ggvCount: function() {
    return this.get('allDeliveries').filterBy('isGogovan', true).length;
  }.property('allDeliveries.@each.deliveryType'),

  dropOffCount: function() {
    return this.get('allDeliveries').filterBy('isDropOff', true).length;
  }.property('allDeliveries.@each.deliveryType'),
});
