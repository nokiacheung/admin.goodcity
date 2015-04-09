import Ember from "ember";

export default Ember.Controller.extend({
  donor: null,

  offersCount: function() {
    return this.get("model.length") + 1;
  }.property('model.length'),

  donorMobile: function(){
    var mobile = this.get("donor.mobile").split("+852")[1];
    return mobile.substr(0, 4) + " " + mobile.substr(4);
  }.property('donor'),
});
