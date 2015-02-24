import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  staffRestricted: true,

  renderTemplate: function() {
    this.render('offer/message_section', {controller: 'review_offer.items'});
  },
});
