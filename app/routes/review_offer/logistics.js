import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({

  setupController(controller, model) {
    this._super(controller, model);
    var defaultGogovanOption = controller.get("defaultGogovanOption");
    controller.set("selectedGogovanOption", defaultGogovanOption);
  }
});
