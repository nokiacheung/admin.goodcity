import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  renderTemplate() {
    this.render('my_list.reviewing', {controller: 'finished.cancelled'});
  },

  model() {
    return this.store.query('offer', { states: ["cancelled", "closed"] });
  }
});
