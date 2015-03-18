import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  renderTemplate: function() {
    this.render('my_list.reviewing', {controller: 'scheduled.collection'});
  },

  model: function() {
    return this.store.filter('offer', function(offer) {
      return offer.get('isScheduled') && offer.get('delivery.isAlternate');
    });
  },

  setupController: function(controller, model){
    controller.set("model", model);
    controller.set("allScheduled", model);
  }
});
