import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({
  model: function() {
    var offerId = this.modelFor('offer').get('id');
    return this.store.find('offer', offerId);
  }
});
