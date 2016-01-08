import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
  attributeBindings: ["record", "recordId", "placeholder", "content", "enabled"],
  isAndroidDevice: false,
  enabled: true,

  didInsertElement() {
    if (config.cordova.enabled) {
      var isAndroidDevice = window.device && (["android", "Android", "amazon-fireos"].indexOf(window.device.platform) >= 0);
      this.set("isAndroidDevice", isAndroidDevice);
    }
  },
});
