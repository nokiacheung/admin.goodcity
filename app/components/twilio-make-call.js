import Ember from 'ember';
import AjaxPromise from '../utils/ajax-promise';
import config from '../config/environment';

export default Ember.Component.extend({

  mobile:      null,
  offerId:     null,
  twilioToken: null,
  activeCall:  false,
  isCordovaApp:  config.cordova.enabled,
  hidden:        Ember.computed.empty("mobile"),
  currentUserId: Ember.computed.alias("session.currentUser.id"),

  hasTwilioSupport: Ember.computed("hasTwilioBrowserSupport", "isCordovaApp", function(){
    return this.get("isCordovaApp") || this.get("hasTwilioBrowserSupport");
  }),

  hasTwilioBrowserSupport: Ember.computed(function(){
    var hasWebRtcSupport = !!window.webkitRTCPeerConnection; // twilio js doesn't use mozRTCPeerConnection
    var hasFlashSupport = !!(navigator.plugins["Shockwave Flash"] || window.ActiveXObject && new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash"));

    return hasWebRtcSupport || hasFlashSupport;
  }),

  twilio_device: Ember.computed(function(){
    return this.get("isCordovaApp") ? window.TwilioClient.Device : Twilio.Device;
  }),

  initTwilioDeviceBindings: function() {
    var _this         = this;
    var twilio_token  = _this.get("twilioToken");
    var twilio_device = _this.get("twilio_device");

    twilio_device.setup(twilio_token, {
      debug: true
    });

    twilio_device.error(function() {
      this.get("twilio_device").disconnectAll();
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
      return this.get("twilio_device").connect(params);
    },

    hangupCall() {
      this.set("activeCall", false);
      return this.get("twilio_device").disconnectAll();
    },
  },

  didInsertElement() {
    if(this.get("hasTwilioSupport")) {
      this._super();
      var _this = this;
      var loadingView = this.container.lookup('component:loading').append();

      new AjaxPromise("/twilio_outbound/generate_call_token", "GET", this.get('session.authToken'))
        .then(data => {
          _this.set("twilioToken", data["token"]);
          _this.initTwilioDeviceBindings();
        })
        .finally(() => loadingView.destroy());
    }
  }
});
