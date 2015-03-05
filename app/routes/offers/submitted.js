import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  staffRestricted: true,
  model: function() {
    return this.store.filter('offer', function(offer) {
      return offer.get('isSubmitted');
    });
  }
});
