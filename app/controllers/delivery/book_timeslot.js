import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: ["delivery", "offer"],
  isSelected: 1,
  actions: {
    assignSchedule: function() {
      var _this = this;
      var selectedSlot = _this.get('isSelected');
      var getSelectedSchedule = _this.store.getById('schedule', selectedSlot);
      var scheduleProperties = getSelectedSchedule.getProperties('zone',
          'resource','scheduledAt', 'slot', 'slotName');
      var bookedSchedule = _this.store.createRecord('schedule', scheduleProperties);
      var deliveryId = _this.get('controllers.delivery').get('id');
      var offerId = _this.get('controllers.offer').get('id');

      bookedSchedule.save().then(function(schedule) {
        var delivery = _this.store.push('delivery', {
            id: deliveryId,
            schedule: schedule,
            offer: offerId
        });
        delivery.save().then(function(){
          _this.transitionToRoute('delivery.contact_details');
        });
      });
    }
  }
});
