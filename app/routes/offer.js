import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({
  model(params) {
    return this.store.findRecord('offer', params.offer_id);
  }
});
