import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({

  model(params) {
    return this.store.findRecord('package', params.package_id);
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set("package", model);
    controller.send("resetInputs");
  }

});
