import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  renderTemplate: function() {
    this.render('my_list.reviewing', {controller: 'my_list.finished'});
  },

  model: function() {
    var currentUserId = this.get("session.currentUser.id");
    return this.store.query('offer', { states: ["inactive"], reviewed_by_id: currentUserId });
  }
});
