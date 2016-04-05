import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({
  renderTemplate() {
    this.render(); // default template
    this.render('appMenuList', {
      into: 'offers',
      outlet: 'appMenuList',
      controller: 'offers'
    });
  }
});
