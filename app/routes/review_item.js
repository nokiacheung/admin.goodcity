import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({

  model(params) {
    return this.store.findRecord('item', params.item_id);
  },

  setupController(controller, model) {
    this._super(controller, model);

    var itemDetails = {
      donorConditionId: model.get("donorConditionId"),
      donorDescription: model.get("donorDescription")
    };
    controller.set("formData", itemDetails);
    controller.set("isEditing", false);
  }

});
