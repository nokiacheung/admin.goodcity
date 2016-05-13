import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ["holiday"],
  arrangedContent: Ember.computed.sort("model", "sortProperties"),
});
