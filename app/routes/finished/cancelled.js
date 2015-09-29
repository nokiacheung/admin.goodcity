import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  renderTemplate: function() {
    this.render('my_list.reviewing', {controller: 'finished.cancelled'});
  },

  model: function() {
    return this.store.query('offer', { states: ["cancelled", "closed"] });
  }
});
