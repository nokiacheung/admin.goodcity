import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  renderTemplate() {
    this.render('my_list.reviewing', {controller: 'my_list.finished'});
  },

  model() {
    var currentUserId = this.get("session.currentUser.id");
    return this.store.query('offer', { states: ["in_active"], reviewed_by_id: currentUserId });
  }
});
