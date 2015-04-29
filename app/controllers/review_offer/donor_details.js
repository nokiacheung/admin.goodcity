import Ember from "ember";

export default Ember.Controller.extend({
  donor: null,

  offersCount: function() {
    return this.get("model.length") + 1;
  }.property('model.length'),

  receivedOffers: function(){
    return this.get('model').filterBy("isReceived", true).length;
  }.property('model')
});
