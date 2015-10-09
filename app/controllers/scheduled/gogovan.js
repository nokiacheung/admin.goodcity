import Ember from 'ember';
import scheduleController from './collection';

export default scheduleController.extend({

  allScheduled: Ember.computed('ggv.[]', {
    get: function() {
      return this.get('ggv');
    },
    set: function(key, value) {
      return value;
    }
  }),

});
