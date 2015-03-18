import Ember from 'ember';

export default Ember.View.extend({
  templateName: "schedule_select_view",

  attributeBindings: ['schedules', 'selectedValue'],
  selectedValue: null,

  weekDays: function() {
    var _this = this;
    var currentDay = moment().day();
    var week = moment.weekdays();

    var options = [
      { name: 'Overdue (' + _this.overdueCount() + ')', id: 'overdue' },
      { name: 'Today (' + _this.scheduleCount() + ')', id: 'today' }];

    for (var i = currentDay + 1; i < week.length; i++) {
      options.push(
        { name: week[i]+" ("+ _this.scheduleCount(week[i]) +")", id: week[i] }
      );
    }

    options.push({ name: 'Next week (' + _this.nextWeekCount() + ')',
      id: 'next'});
    options.push({ name: 'After next week (' + _this.afterNextWeekCount() + ')', id: 'after_next'});
    return options;
  }.property('schedules'),

  overdueCount: function(){
    return this.get('controller').overdue().length;
  },

  scheduleCount: function(dayValue){
    return this.get('controller').daySchedule(dayValue).length;
  },

  nextWeekCount: function(){
    return this.get('controller').nextWeek().length;
  },

  afterNextWeekCount: function(){
    return this.get('controller').afterNextWeek().length;
  },

  selectedObserver: function(){
    this.get('controller').send('filterOffers', this.get('selectedValue.id'));
  }.observes('selectedValue'),
});
