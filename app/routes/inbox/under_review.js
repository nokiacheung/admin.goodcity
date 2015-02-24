import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  staffRestricted: true,

  renderTemplate: function() {
    this.render('inbox.index', {controller: 'inbox.under_review'});
  },

  model: function() {
    return this.store.filter('offer', function(offer) {
      return offer.get('isUnderReview');
    });
  }
});
