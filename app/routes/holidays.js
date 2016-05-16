import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({
  renderTemplate() {
    this.render(); // default template
    this.render('appMenuList', {
      into: 'holidays',
      outlet: 'appMenuList',
      controller: 'offers'
    });
  },

  model() {
    return this.store.peekAll('holiday');
  }
});
