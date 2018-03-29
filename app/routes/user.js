import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({

  model(params) {
    return this.store.peekRecord('user', params.user_id);
  },

  afterModel(model) {
    return this.store.query('userRole', { search_by_user_id: model.id });
  }

  // setupController(controller, model) {
  //   this._super(controller, model);
  // }

});
