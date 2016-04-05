import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({

  renderTemplate() {
    this.render('offers.submitted', {controller: 'offers.receiving'});
  },

});
