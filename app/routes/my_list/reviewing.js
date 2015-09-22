import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  model: function() {
    var currentUserId = this.get('session.currentUser.id');
    var currentUser = this.store.peekRecord('user', currentUserId);
    return this.store.filter('offer', function(offer) {
      return offer.get('isUnderReview') && offer.get('reviewedBy') === currentUser;
    });
  }
});
