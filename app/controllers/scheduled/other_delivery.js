import scheduleController from './collection';

export default scheduleController.extend({

  allScheduled: Ember.computed('dropOff', {
    get: function() {
      return this.get('dropOff');
    },
    set: function(key, value) {
      return value;
    }
  }),

});
