import Ember from "ember";
import config from '../../config/environment';

export default Ember.Controller.extend({
  donor:          null,
  currentOffer:   null,
  offersCount:    Ember.computed.alias('model.length'),
  goodcityNumber: config.APP.GOODCITY_NUMBER,
  internetCallStatus: Ember.inject.controller(),

  displayNumber: Ember.computed("donor.mobile", function(){
    var num = this.get("donor.mobile").replace(/\+852/, "");
    return num.length > 4 ? num.substr(0, 4) + " " + num.substr(4) : num;
  }),

  donorOffers: Ember.computed('model', function(){
    return this.get("model").rejectBy("id", this.get('currentOffer.id'));
  }),

  receivedOffers: Ember.computed('model', function(){
    return this.get('model').filterBy("isReceived", true).length;
  }),
});
