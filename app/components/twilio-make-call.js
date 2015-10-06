import Ember from 'ember';
import AjaxPromise from '../utils/ajax-promise';

export default Ember.Component.extend({

  mobile:      null,
  offerId:     null,
  twilioToken: null,
  activeCall:  false,

  hidden:        Ember.computed.empty("mobile"),
  currentUserId: Ember.computed.alias("session.currentUser.id"),

  hasTwilioSupport: Ember.computed(function(){
    var hasWebRtcSupport = !!window.webkitRTCPeerConnection; // twilio js doesn't use mozRTCPeerConnection
    var hasFlashSupport = !!(navigator.plugins["Shockwave Flash"] || window.ActiveXObject && new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash"));

    return hasWebRtcSupport || hasFlashSupport;
  }),

  initTwilioDeviceBindings: function() {
    var _this         = this;
    var twilio_token  = _this.get("twilioToken");
    var twilio_device = Twilio.Device;
    twilio_device.setup(twilio_token, {
      debug: true
    });

    twilio_device.error(function() {
      Twilio.Device.disconnectAll();
      _this.set("activeCall", false);
    });

    twilio_device.disconnect(function() {
      _this.set("activeCall", false);
    });
  },

  actions: {

    makeCall() {
      var params = { "phone_number": this.get('offerId') + "#" + this.get("currentUserId") };
      this.set("activeCall", true);
      return Twilio.Device.connect(params);
    },

    hangupCall() {
      return Twilio.Device.disconnectAll();
    },
  },

  didInsertElement() {
    if(this.get("hasTwilioSupport")) {
      this._super();
      var _this = this;
      var loadingView = this.container.lookup('view:loading').append();

      new AjaxPromise("/twilio_outbound/generate_call_token", "GET", this.get('session.authToken'))
        .then(data => {
          _this.set("twilioToken", data["token"]);
          _this.initTwilioDeviceBindings();
        })
        .finally(() => loadingView.destroy());
    }
  }
});
