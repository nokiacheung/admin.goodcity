import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({
  renderTemplate() {
    this.render(); // default template
    this.render('appMenuList', {
      into: 'terms_and_conditions',
      outlet: 'appMenuList',
      controller: 'offers'
    });
  }
});
