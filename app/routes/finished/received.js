import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  renderTemplate() {
    this.render('my_list.reviewing', {controller: 'finished.received'});
  },

  model() {
    return this.store.query('offer', { states: ["received"] });
  }
});
