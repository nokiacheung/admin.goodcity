import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ["unreadMessagesCount:desc", "delivery.schedule.scheduledAt:desc"],
  arrangedContent: Ember.computed.sort("model", "sortProperties"),
  scheduleldOffers: true,

  allScheduled: function(key, value){
    return (arguments.length > 1) ? value : this.get('model');
  }.property(),

  overdue: function(){
    return this.get('allScheduled').filter(function(offer){
      return offer.get('delivery.schedule.scheduledAt') < moment().toDate();
    });
  },

  nextWeek: function(){
    var firstDay = moment().day(7).startOf('day').toDate();
    var lastDay  = moment().day(13).endOf('day').toDate();

    return this.get('allScheduled').filter(function(offer){
      var date = offer.get('delivery.schedule.scheduledAt').setHours(0,0,0,0);
      return (firstDay < date) && (date < lastDay);
    });
  },

  afterNextWeek: function(){
    var firstDay = moment().day(14).startOf('day').toDate();
    return this.get('allScheduled').filter(function(offer){
      var date = offer.get('delivery.schedule.scheduledAt').setHours(0,0,0,0);
      return firstDay < date;
    });
  },

  daySchedule: function(dayValue){
    var day = dayValue ? moment().day(dayValue) : moment();
    var today = day.startOf('day').toDate().toISOString();

    return this.get('allScheduled').filter(function(offer){
      var date = offer.get('delivery.schedule.scheduledAt');
      return today === (date.toISOString());
    });
  },

  actions: {

    filterOffers: function(filterValue) {
      var offers;
      switch(filterValue) {
        case 'overdue': offers = this.overdue(); break;
        case 'next': offers = this.nextWeek(); break;
        case 'after_next': offers = this.afterNextWeek(); break;
        case 'today': offers = this.daySchedule(); break;
        default: offers = this.daySchedule(filterValue); break;
      }
      this.set('model', offers);
    }
  },

  didInsertElement: function() {
    this.set('allScheduled', this.get('model'));
  }
});
