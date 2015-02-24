import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  staffRestricted: true,
  model: function() {
    var itemId = this.modelFor('review_item').get('id');
    return this.store.getById('item', itemId);
  }
});
