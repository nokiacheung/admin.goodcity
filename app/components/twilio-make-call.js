import Ember from 'ember';
import AjaxPromise from '../utils/ajax-promise';

export default Ember.Component.extend({

  mobile: "",
  hidden: Ember.computed.empty("mobile"),

  mobileWithPrefix: function() {
    var mobile = this.get("mobile");
    var prefix = mobile.indexOf("+852") === -1 ? "" : "";
    return this.get('session.currentUser.id') + "#" + this.get("offerId") + "#" + prefix + mobile.replace(/ /g, "");
  }.property("mobile"),

  displayNumber: function() {
    var num = this.get("mobile").replace(/\+852/, "");
    return num.length > 4 ? num.substr(0, 4) + " " + num.substr(4) : num;
  }.property("mobile"),

  initTwilioDeviceBindings: function() {
    var twilio_device, twilio_token;
    twilio_token = Ember.$('#twilio_token').data('token');
    twilio_device = Twilio.Device;
    twilio_device.setup(twilio_token, {
      debug: true
    });

    twilio_device.error(function() {
      Twilio.Device.disconnectAll();
      return Ember.$("#hangup").hide();
    });

    twilio_device.disconnect(function() {
      return Ember.$("#hangup").hide();
    });
  },

  actions: {

    makeCall: function(){
      var params = { "phone_number": Ember.$('#phoneNumber').data('mobile') };
      this.send("displayHangupIcon");
      return Twilio.Device.connect(params);
    },

    hangupCall: function(){
      return Twilio.Device.disconnectAll();
    },

    displayHangupIcon: function(){
      Ember.$("#hangup").fadeIn().css('display', 'inline-block');
    }
  },

  didInsertElement: function() {
    this._super();
    var _this = this;

    var loadingView = this.container.lookup('view:loading').append();

    new AjaxPromise("/twilio/twilio_generate_call_token", "GET", null)
      .then(data => {
        Ember.$("#twilio_token").data("token", data["token"]);
        _this.initTwilioDeviceBindings();
      })
      .catch(error => {
        throw error;
      })
      .finally(() => loadingView.destroy());
  }
});
