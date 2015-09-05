import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({
  model: function(params) {
    return this.store.findRecord('item', params.item_id);
  }
});
