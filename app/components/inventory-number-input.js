import Ember from 'ember';
import config from '../config/environment';
import AjaxPromise from '../utils/ajax-promise';

export default Ember.Component.extend({

  attributeBindings: ["name", "inputId", "value", "invalid", "disabled", "packageId"],
  isCordovaApp: config.cordova.enabled,
  alert: Ember.inject.service(),
  showMenu: false,
  bardcodeReadonly: true,

  actions: {
    toggleMenu() {
      this.toggleProperty("showMenu");
    },

    scanBarcode() {
      cordova.plugins.barcodeScanner
        .scan(res => {
          if (!res.cancelled) {
            this.set("value", res.text);
          }
        }, error => this.get("alert").show("Scanning failed: " + error));
    },

    printBarcode() {
      var loadingView = this.container.lookup('component:loading').append();
      new AjaxPromise("/packages/print_barcode", "POST", this.get('session.authToken'), {package_id: this.get("packageId")})
        .catch(xhr => {
          if (xhr.status !== 200) {
            var errors = xhr.responseText;
            try { errors = Ember.$.parseJSON(xhr.responseText).errors; }
            catch(err) {}
            this.get("alert").show(errors);
          } else {
            throw xhr;
          }
        })
        .then(data => {
          this.set("value", data["inventory_number"]);
        })
        .finally(() => loadingView.destroy());
    },

    enterBarcode() {
      this.set("bardcodeReadonly", false);
    }
  }

});
