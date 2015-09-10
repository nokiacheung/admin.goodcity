import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ["reviewCompletedAt:desc"],
  arrangedContent: Ember.computed.sort("model", "sortProperties"),
});
