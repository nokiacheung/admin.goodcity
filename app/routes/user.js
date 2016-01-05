import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({

  model(params) {
    return this.store.peekRecord('user', params.user_id);
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set("selectedId", model.get("permission.id"));
  }

});
