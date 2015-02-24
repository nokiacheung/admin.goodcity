import Ember from 'ember';
import AjaxPromise from './../../utils/ajax-promise';

export default Ember.ObjectController.extend({
  needs: ["delivery", "offer"],

  slots: function() {
    return this.store.all('timeslot').sortBy('id');
  }.property('timeslot.@each'),

  selectedId: function(){
    return this.get('slots.firstObject.id');
  }.property('slots'),

  selectedDate: null,

  available_dates: function(key, value){
    if (arguments.length > 1) {
      return value;
    } else {
      var _this = this;
      new AjaxPromise("/available_dates", "GET", this.get('session.authToken'), {schedule_days: 10})
      .then(function(data) {
        _this.set("available_dates", data);
        value = data;
      });
      return value;
    }
  }.property('available_dates.[]'),

  actions: {
    bookSchedule: function() {
      var loadingView = this.container.lookup('view:loading').append();

      var _this = this;
      var selectedSlot = _this.get('selectedId');
      var date = _this.get('selectedDate');
      var slotName = _this.get('slots').filterBy('id', selectedSlot.get('id')).get('firstObject.name');

      var scheduleProperties = { slot: selectedSlot, scheduledAt: date, slotName: slotName};

      var bookedSchedule = _this.store.createRecord('schedule', scheduleProperties);
      var deliveryId = _this.get('controllers.delivery').get('id');
      var offerId = _this.get('controllers.offer').get('id');
      var offer = _this.store.getById('offer', offerId);

      bookedSchedule.save().then(function(schedule) {
        var delivery = _this.store.push('delivery', {
            id: deliveryId,
            schedule: schedule,
            offer: offerId
        });
        delivery.save().then(function(){
          offer.set('state', 'scheduled');
          loadingView.destroy();
          _this.transitionToRoute('offer.transport_details', offer);
        });
      });
    }
  }
});
