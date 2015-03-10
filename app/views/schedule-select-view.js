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
      { name: 'Overdue (' + this.get('overdueCount') + ')', id: 'overdue' },
      { name: 'Today (' + _this.scheduleCount() + ')', id: 'today' }];

    for (var i = currentDay + 1; i < week.length; i++) {
      options.push(
        { name: week[i]+" ("+ _this.scheduleCount(week[i]) +")", id: week[i] }
      );
    }

    options.push({ name: 'Next week (' + this.get('nextWeekCount') + ')',
      id: 'next'});
    options.push({ name: 'After next week (' + this.get('afterNextWeekCount') + ')', id: 'after_next'});
    return options;
  }.property(),

  overdueCount: function(){
    return this.get('controller').overdue().length;
  }.property('schedules'),

  scheduleCount: function(dayValue){
    return this.get('controller').daySchedule(dayValue).length;
  },

  nextWeekCount: function(){
    return this.get('controller').nextWeek().length;
  }.property('schedules'),

  afterNextWeekCount: function(){
    return this.get('controller').afterNextWeek().length;
  }.property('schedules'),

  selectedObserver: function(){
    console.log(this.get('selectedValue.id'));
    this.get('controller').send('filterOffers', this.get('selectedValue.id'));
  }.observes('selectedValue'),
});
