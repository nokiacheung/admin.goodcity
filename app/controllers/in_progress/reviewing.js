import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ["reviewedAt:desc"],
  arrangedContent: Ember.computed.sort("model", "sortProperties"),
});
