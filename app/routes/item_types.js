import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({
  model() {
    return this.store.peekAll('package_type');
  }
});
