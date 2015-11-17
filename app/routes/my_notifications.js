import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({
  model() {
    var currentUserId = this.get("session.currentUser.id");

    return this.store.filter('message', function(message) {
      return message.get('state') !== 'never-subscribed' && message.get('offer.createdBy.id') !== currentUserId;
    });
  },
});
