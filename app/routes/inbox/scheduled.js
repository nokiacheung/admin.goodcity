import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  staffRestricted: true,

  renderTemplate: function() {
    this.render('inbox.index', {controller: 'inbox.scheduled'});
  },

  model: function() {
    return this.store.filter('offer', function(offer) {
      return offer.get('isScheduled');
    });
  }
});
