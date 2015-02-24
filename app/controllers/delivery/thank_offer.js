import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['delivery', 'offer'],

  contact: function(key, value) {
    if(arguments.length > 1) {
      return value;
    } else {
      var deliveryId = this.get('controllers.delivery.id');
      return this.store.getById('delivery', deliveryId);
    }
  }.property('model'),

  actions:{
    done: function(){
      var offerId = this.get('controllers.offer.id');
      this.transitionToRoute('offer.transport_details', offerId);
    }
  }
});
