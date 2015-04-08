import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  model: function() {
    var offerId = this.modelFor('reviewOffer').get('id');
    var offer = this.store.getById('offer', offerId);
    return offer.get('createdBy');
  }
});
