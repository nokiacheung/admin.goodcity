import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  renderTemplate() {
    this.render('my_list.reviewing', {controller: 'my_list.scheduled'});
  },

  model() {
    var currentUserId = this.get('session.currentUser.id');
    var currentUser = this.store.peekRecord('user', currentUserId);
    return this.store.filter('offer', function(offer) {
      return offer.get('isScheduled') && offer.get('reviewedBy') === currentUser;
    });
  }
});
