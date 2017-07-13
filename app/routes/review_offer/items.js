import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({

  renderTemplate() {
    this.render('offer/message_section', {controller: 'review_offer.items'});
  }
});
