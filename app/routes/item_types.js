import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({
  model: function() {
    return this.store.all('package_type');
  }
});
