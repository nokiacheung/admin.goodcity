import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({
  renderTemplate() {
    this.render(); // default template
    this.render('appMenuList', {
      into: 'pics',
      outlet: 'appMenuList',
      controller: 'offers'
    });
  }
});
