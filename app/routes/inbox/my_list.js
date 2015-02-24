import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  staffRestricted: true,

  renderTemplate: function() {
    this.render('inbox.index', {controller: 'inbox.my_list'});
  },

  model: function() {
    var currentUserId = this.get('session.currentUser.id');
    var currentUser = this.store.getById('user', currentUserId);
    return this.store.filter('offer', function(offer) {
      return offer.get('isUnderReview') && offer.get('reviewedBy') === currentUser;
    });
  }
});
