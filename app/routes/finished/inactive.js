import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  renderTemplate() {
    this.render('my_list.reviewing', {controller: 'finished.inactive'});
  },

  model() {
    return this.store.query('offer', { states: ["inactive"] });
  }
});
