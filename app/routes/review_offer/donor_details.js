import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({

  currentDonor: null,

  model: function() {
    var offerId = this.modelFor('reviewOffer').get('id');
    var currentOffer = this.store.getById('offer', offerId);
    var donor = currentOffer.get('createdBy');
    this.set("currentDonor", donor);
    return this.store.find('offer', { created_by_id: donor.get('id') });
  },

  setupController: function(controller, model){
    controller.set("model", model);
    controller.set("donor", this.get("currentDonor"));
  }

});
