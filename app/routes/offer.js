import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({
  model: function(params) {
    return this.store.getById('offer', params.offer_id);
  }
});
