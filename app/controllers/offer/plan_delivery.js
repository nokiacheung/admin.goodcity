import Ember from 'ember';
import AjaxPromise from './../../utils/ajax-promise';

export default Ember.ObjectController.extend({
  needs: ["offer"],

  offerId: Ember.computed.alias('controllers.offer.id'),

  isChinesePage: function(){
    return Ember.I18n.translations.language === 'zh-tw';
  }.property(),

  offer: function(){
    return this.store.getById('offer', this.get('offerId'));
  }.property('offerId'),

  gogovanPrice: function(key, value) {
    if (arguments.length > 1) {
      return value;
    } else {
      var controller = this;
      var user = controller.session.get('currentUser');
      var request = {};
      request.districtId = user.get('address.district.id');
      request.offerId = controller.get("offerId");

      new AjaxPromise("/gogovan_orders/calculate_price", "POST", controller.get('session.authToken'), request).then(function(data) {
          controller.set("gogovanPrice", data['base']);
          value = data['base'];
        });

      return value || '';
    }
  }.property('offerId'),

  actions: {
    startDelivery: function(delivery_type) {
      var offerId = this.get('controllers.offer').get('id');
      var delivery = this.store.createRecord('delivery', {
        offer: this.store.getById('offer', offerId),
        deliveryType: delivery_type
      });

      var route = this;
      delivery.save().then(function(delivery) {
        switch(delivery_type) {
          case 'Alternate':
            route.transitionToRoute('delivery.book_timeslot', delivery);
            break;
          case 'Gogovan':
            route.transitionToRoute('delivery.book_van', delivery);
            break;
          case 'Drop Off':
            route.transitionToRoute('delivery.drop_off_schedule', delivery);
            break;
        }
      });
    }
  }
});
