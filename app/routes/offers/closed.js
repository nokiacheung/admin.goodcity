import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  staffRestricted: true,

  renderTemplate: function() {
    this.render('offers.submitted', {controller: 'offers.closed'});
  },

  model: function() {
    return this.store.filter('offer', function(offer) {
        return offer.get('isClosed');
    });
  }
});
