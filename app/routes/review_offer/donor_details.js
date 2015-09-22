import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({

  currentDonor: null,
  currentOffer: null,

  model: function() {
    var offerId = this.modelFor('reviewOffer').get('id');
    var currentOffer = this.store.peekRecord('offer', offerId);
    var donor = currentOffer.get('createdBy');
    this.set("currentDonor", donor);
    this.set("currentOffer", currentOffer);
    return this.store.query('offer', { created_by_id: donor.get('id'), states: ['nondraft'] });
  },

  setupController: function(controller, model){
    controller.set("model", model);
    controller.set("donor", this.get("currentDonor"));
    controller.set("currentOffer", this.get("currentOffer"));
  }

});
