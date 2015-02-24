import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({
  staffRestricted: true,

  model: function() {
    var offerId = this.modelFor('offer').get('id');
    return this.store.getById('offer', offerId);
  }
});
