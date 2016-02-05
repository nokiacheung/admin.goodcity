import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  renderTemplate() {
    this.render('my_list.reviewing', {controller: 'my_list.finished'});
  },

  model() {
    var currentUserId = this.get("session.currentUser.id");
    return this.store.query('offer', { states: ["inactive"], reviewed_by_id: currentUserId });
  }
});
