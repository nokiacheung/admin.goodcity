import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return parseInt(params.tour_id);
  }
});
