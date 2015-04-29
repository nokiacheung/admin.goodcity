import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  model: function() {
    var offerId = this.modelFor('reviewOffer').get('id');
    var currentOffer = this.store.getById('offer', offerId);
    var donor = currentOffer.get('createdBy');

    return this.store.find('offer', { created_by_id: donor.get('id') });
  },

  setupController: function(controller, model){
    controller.set("model", model);
    controller.set("donor", model.get('firstObject.createdBy'));
  }

});
