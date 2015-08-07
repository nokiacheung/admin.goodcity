import Ember from "ember";
import config from '../../config/environment';

export default Ember.Controller.extend({
  donor:        null,
  currentOffer: null,
  isCordovaApp: config.cordova.enabled,
  offersCount:  Ember.computed.alias('model.length'),

  goodcityNumber: config.APP.GOODCITY_NUMBER,

  displayNumber: function() {
    var num = this.get("donor.mobile").replace(/\+852/, "");
    return num.length > 4 ? num.substr(0, 4) + " " + num.substr(4) : num;
  }.property("mobile"),

  donorOffers: function(){
    return this.get("model").rejectBy("id", this.get('currentOffer.id'));
  }.property('model'),

  receivedOffers: function(){
    return this.get('model').filterBy("isReceived", true).length;
  }.property('model')
});
