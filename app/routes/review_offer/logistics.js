import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({

  setupController(controller, model) {
    var defaultGogovanOption = controller.get("defaultGogovanOption");
    controller.set("model", model);
    controller.set("selectedGogovanOption", defaultGogovanOption);
  },
});
