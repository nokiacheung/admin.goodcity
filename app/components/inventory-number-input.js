import Ember from 'ember';
import config from '../config/environment';
import AjaxPromise from '../utils/ajax-promise';

export default Ember.Component.extend({

  attributeBindings: [ "name", "inputId", "value", 'invalid'],
  isCordovaApp: config.cordova.enabled,
  alert: Ember.inject.service(),

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
    },

    printBarcode() {
      var loadingView = this.container.lookup('component:loading').append();
      new AjaxPromise("/packages/print_barcode", "POST", this.get('session.authToken'), {inventory_number: this.get("value")}, {dataType:"text"})
        .catch(xhr => {
          if (xhr.status !== 200) {
            this.get("alert").show(xhr.responseText);
          } else {
            throw xhr;
          }
        })
        .finally(() => loadingView.destroy());
    }

  }

});
