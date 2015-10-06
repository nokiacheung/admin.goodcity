import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  model() {
    return this.store.filter('offer', function(offer) {
      return offer.get('isReceiving');
    });
  }
});
