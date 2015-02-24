import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({
  model: function() {
    return this.store.all.filter('item_type', function(itemtype) {
      console.log("ItemType is ", itemtype.get('parentId'));
        return itemtype.get('parentId') == null;
    });
  }
});
