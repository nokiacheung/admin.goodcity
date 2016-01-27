import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({

  attributeBindings: [ "name", "inputId", "value", 'invalid'],
  isCordovaApp: config.cordova.enabled,

  actions: {

    inputInventory(){
      var _this = this;
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          if(!result.cancelled) {
            _this.set("value", result.text);
          }
        },
        function (error) {
          this.get("alert").show("Scanning failed: " + error);
        }
     );
    }

  }

});
