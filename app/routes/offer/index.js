import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  controllerName: 'offer/offer_details',

  afterModel: function(my_offer) {
    if(my_offer.get('itemCount') > 0) {
      this.transitionTo('offer.offer_details', my_offer);
    }
  },
});
