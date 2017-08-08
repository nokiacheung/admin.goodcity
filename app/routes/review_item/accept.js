import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({

  setupController(controller, model) {
    this._super(controller, model);
    controller.notifyPropertyChange("itemTypeId");
  }

});
