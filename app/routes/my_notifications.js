import BackNavigatorRoute from './back_navigator';

export default BackNavigatorRoute.extend({
  model: function() {
    return this.store.filter('message', function(message) {
      return message.get('state') !== 'never-subscribed';
    });
  },
});
