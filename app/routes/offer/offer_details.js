import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({

  model: function() {
    var offerId = this.modelFor('offer').get('id');
    return this.store.getById('offer', offerId);
  },

  afterModel: function(my_offer) {
    if(my_offer.get('itemCount') === 0) {
      this.transitionTo('offer', my_offer);
    }
  }
});
