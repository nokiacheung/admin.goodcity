import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({
  staffRestricted: true,

  model: function(params) {
    return this.store.getById('item', params.item_id);
  }
});
