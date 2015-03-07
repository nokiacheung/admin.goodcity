import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  renderTemplate: function() {
    this.render('my_list.reviewing', {controller: 'my_list.finished'});
  },

  model: function() {
    var currentUserId = this.get('session.currentUser.id');
    var currentUser = this.store.getById('user', currentUserId);
    return this.store.filter('offer', function(offer) {
      return (offer.get('isClosed') || offer.get('isReceived')) && offer.get('reviewedBy') === currentUser;
    });
  }
});
