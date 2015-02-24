import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  staffRestricted: true,

  renderTemplate: function() {
    this.render('inbox.index', {controller: 'inbox.received'});
  },

  model: function() {
    return this.store.filter('offer', function(offer) {
        return offer.get('isReceived');
    });
  }
});
