import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({
  model: function(params) {
    return this.store.find('item', params.item_id);
  }
});
