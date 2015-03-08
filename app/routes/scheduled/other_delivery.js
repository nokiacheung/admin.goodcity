import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  renderTemplate: function() {
    this.render('my_list.reviewing', {controller: 'scheduled.other_delivery'});
  },

  model: function() {
    return this.store.filter('offer', function(offer) {
      return offer.get('isScheduled') && offer.get('delivery.isDropOff');
    });
  }
});
