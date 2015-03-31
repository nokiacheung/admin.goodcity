import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({

  model: function(params) {
    var item = this.store.getById('item', params.item_id);
    return item || this.store.find('item', params.item_id);
  }
});
