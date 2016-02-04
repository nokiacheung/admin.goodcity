import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({

  setupController(controller, model) {
    this._super(controller, model);

    var deliveredOptionsArray = [
      { value: "Unknown", name: this.get("i18n").t("mark_received.unknown") },
      { value: "Gogovan", name: this.get("i18n").t("mark_received.gogovan") },
      { value: "Alternate", name: this.get("i18n").t("mark_received.crossroads_truck") },
      { value: "Drop Off", name: this.get("i18n").t("mark_received.dropped_off") }
    ];
    var deliveryType = model.get("delivery.deliveryType");
    var selection = deliveredOptionsArray.findBy("value", deliveryType);

    controller.set("deliveredOptions", deliveredOptionsArray);
    controller.set("deliveredBy", selection);
  },

});
