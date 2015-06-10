import Ember from "ember";

export default Ember.Controller.extend({
  donor: null,
  currentOffer: null,

  offersCount: Ember.computed.alias('model.length'),

  donorOffers: function(){
    return this.get("model").rejectBy("id", this.get('currentOffer.id'));
  }.property('model'),

  receivedOffers: function(){
    return this.get('model').filterBy("isReceived", true).length;
  }.property('model')
});
