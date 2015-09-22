import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({
  model: function(params) {
    return this.store.peekRecord('package', params.package_id);
  }
});
