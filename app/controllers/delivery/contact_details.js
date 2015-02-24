import Ember from 'ember';
import addressDetails from './address_details';

export default addressDetails.extend({
  needs: ["delivery"],

  actions: {
    saveContactDetails: function() {
      var addressProperties = this.getProperties('street', 'flat', 'building');
      addressProperties.district = this.selectedDistrict;
      addressProperties.addressType = 'collection';

      var contactProperties = {};
      contactProperties.name = Ember.$('#userName').val();
      contactProperties.mobile = "+852" + Ember.$('#mobile').val();

      var contact = this.store.createRecord('contact', contactProperties);
      var deliveryId = this.get('controllers.delivery').get('id');
      var delivery = this.store.getById('delivery', deliveryId);
      var offer = delivery.get('offer');
      var schedule = delivery.get('schedule');

      // Save the new model
      var route = this;
      contact.save().then(function(contact) {
        addressProperties.addressable = contact;
        var address = route.store.createRecord('address', addressProperties);
        address.save().then(function() {
          var delivery = route.store.push('delivery', {
            id: deliveryId,
            contact: contact,
            offer: offer,
            schedule: schedule
          });

          delivery.save().then(function() {
            offer.set('state', 'scheduled');
            route.transitionToRoute('delivery.thank_offer').then(function(newRoute) {
              newRoute.controller.set('contact', contact);
            });
          });
        });
      });
    }
  }
});
