import BackNavigatorRoute from './back_navigator';

export default BackNavigatorRoute.extend({
  model: function() {
    var offerId = this.modelFor('offer').get('id');
    return this.store.find('offer', offerId);
  }
});
