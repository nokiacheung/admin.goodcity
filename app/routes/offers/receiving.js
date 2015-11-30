import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({

  renderTemplate() {
    this.render('offers.submitted', {controller: 'offers.receiving'});
  },

  model() {
    return this.store.filter('offer', function(offer) {
      return offer.get('isReceiving');
    });
  }
});
