import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  renderTemplate: function() {
    this.render('my_list.reviewing', {controller: 'my_list.finished'});
  },

  model: function() {
    return this.store.find('offer', { category: "finished", reviewer: true });
  }
});
