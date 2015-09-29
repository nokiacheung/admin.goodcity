import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({
  staffRestricted: true,

  model() {
    return this.store.filter('offer', function(offer) {
      return offer.get('state') === 'submitted';
    });
  },

  renderTemplate() {
    this.render(); // default template
    this.render('appMenuList', {
      into: 'offers',
      outlet: 'appMenuList',
      controller: 'offers'
    });
  }
});
