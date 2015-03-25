import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({

  model: function() {
    var offerId = this.modelFor('offer').get('id');
    var offer = this.store.getById('offer', offerId);
    return (offer ? offer : this.resourceNotFound("offer"));
  }
});
