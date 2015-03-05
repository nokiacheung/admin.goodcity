import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  staffRestricted: true,

  renderTemplate: function() {
    this.render('offers.submitted', {controller: 'offers.under_review'});
  },

  model: function() {
    return this.store.filter('offer', function(offer) {
      return offer.get('isUnderReview');
    });
  }
});
