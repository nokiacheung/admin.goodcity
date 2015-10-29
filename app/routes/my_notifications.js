import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({
  model() {
    return this.store.filter('message', function(message) {
      return message.get('state') !== 'never-subscribed';
    });
  },
});
