import Ember from 'ember';

export default Ember.Component.extend({
  hidden: true,
  packageId: null,
  store: Ember.inject.service(),
  alert: Ember.inject.service(),

  packageForm: Ember.computed("package", {
    get: function() {
      var pkg = this.get('package');
      return {
        quantity: pkg.get("quantity"),
        length: pkg.get("length"),
        width: pkg.get("width"),
        height: pkg.get("height"),
        inventoryNumber: pkg.get("inventoryNumber"),
      };
    },
    set: function(key, value) {
      return {
        quantity: value.get("quantity"),
        length: value.get("length"),
        width: value.get("width"),
        height: value.get("height"),
        inventoryNumber: value.get("inventoryNumber"),
      };
    }
  }),

  isReceived: Ember.computed.equal("package.state", "received"),
  isMissing: Ember.computed.equal("package.state", "missing"),

  offer: Ember.computed('packageId', function(){
    return this.get("store").peekRecord("offer", this.get("package.offerId"));
  }),

  package: Ember.computed('packageId', function(){
    return this.get("store").peekRecord("package", this.get("packageId"));
  }),

  currentUrl: Ember.computed('packageId', function(){
    return this.container.lookup("router:main").get("url");
  }),

  isFirstReceivingPackage: Ember.computed('package', function(){
    var offerPackages = this.get("offer.packages");
    return offerPackages.get("length") === offerPackages.filterBy("state", "expecting").length && !this.get("offer.isReceiving");
  }),

  updatePackage: function(action) {
    var pkg = this.get("package");
    action(pkg);
    pkg.save()
      .catch(error => { pkg.rollback(); throw error; });
  },

  hasErrors: Ember.computed('invalidQuantity', 'invalidInventoryNo',{
    get: function() {
      return this.get("invalidQuantity") || this.get("invalidInventoryNo");
    },
    set: function(key, value) {
      return value;
    }
  }),

  invalidQuantity: Ember.computed({
    get: function() {
      return this.get("package.quantity").length === 0;
    },
    set: function(key, value) {
      return value;
    }
  }),

  invalidInventoryNo: Ember.computed({
    get: function() {
      var isValid = this.verifyInventoryNumber(this.get("package.inventoryNumber"));
      return isValid;
    },
    set: function(key, value) {
      return value;
    }
  }),

  actions: {
    toggle(hidden) {
      this.set("hidden", hidden);
    },

    missing() {
      if(this.get("isFirstReceivingPackage")) {
        this.confirmReceiving("confirmReceivingModal", () => this.send("missingPackage"));
      } else {
        this.send("missingPackage");
      }
    },

    receive() {
      if(this.get("isFirstReceivingPackage")) {
        this.confirmReceiving("confirmReceivingModal", () => this.send("addToStockit"));
      } else {
        if(!this.get("isReceived")) { this.send("addToStockit"); }
      }
    },

    addToStockit() {
      this.confirmReceiving("stockitAddItemModal" + this.get("packageId"), () => this.send("receivePackage"));
    },

    missingPackage() {
      this.updatePackage(p => {
        p.set("state", "missing");
        p.set("state_event", "mark_missing");
      });
    },

    receivePackage() {
      var pkg = this.get("package");
      var pkgData = this.get("packageForm");
      pkg.set("state", "received");
      pkg.set("state_event", "mark_received");
      pkg.set("quantity", pkgData.quantity);
      pkg.set("length", pkgData.length);
      pkg.set("width", pkgData.width);
      pkg.set("height", pkgData.height);
      pkg.set("inventoryNumber", pkgData.inventoryNumber);
      pkg.save()
        .catch(error => {
          if(pkg.get("errors.firstObject.attribute") === "connection_error") {
            this.get("alert").show(pkg.get("errors.firstObject.message"), () => {});
          } else {
            pkg.rollback();
            throw error;
          }
        });
    },

    resetInputs() {
      this.set("invalidQuantity", false);
      this.set("invalidInventoryNo", false);
      this.set("hasErrors", false);
      this.notifyPropertyChange('package');
    },

    verifyInputs() {
      Ember.$("input[name='qty']").trigger("focusout");
      Ember.$("input[name='inventoryNumber']").trigger("focusout");
    }
  },

  confirmReceiving: function(modalId, successCallback) {
    var _this = this;
    Ember.$("#" + modalId).removeClass("open");
    _this.send("resetInputs");

    Ember.$("#" + modalId).foundation("reveal", "open");
    Ember.$(".loading-indicator").remove();

    Ember.$("#" + modalId +" .closeLink").click(() => {
      _this.closeConfirmBox();
    });

    _this.observeInputValidation();

    Ember.$("#" + modalId +" .confirmLink").click((e) => {
      var form = Ember.$(e.target).closest('.receive_package_modal');
      _this.send("verifyInputs");

      if(form.length > 0 && (_this.get("invalidQuantity") || _this.get("invalidInventoryNo"))) {
        _this.set("hasErrors", true);
        return false;
      } else {
        _this.set("hasErrors", false);
      }

      _this.closeConfirmBox();
      successCallback();
    });
  },

  closeConfirmBox: function() {
    Ember.run.next(function() {
      Ember.$("#confirmReceivingModal").foundation("reveal", "close");
    });
  },

  observeInputValidation: function(){
    var _this = this;

    Ember.$("input[name='qty']").bind("change focusout", function () {
      var isValid = this.value.length > 0;
      _this.set("invalidQuantity", !isValid);
    });

    Ember.$("input[name='inventoryNumber']").bind("change focusout", function () {
      var isValid = _this.verifyInventoryNumber(this.value);
      _this.set("invalidInventoryNo", !isValid);
    });
  },

  verifyInventoryNumber: function(value) {
    return /[#{A-Z}][0-9]{5}[a-zA-Z]{0,1}[0-9]*/.test(value);
  },

  didInsertElement() {
    this.send("resetInputs");
  }
});
