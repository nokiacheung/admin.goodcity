import AuthorizeRoute from './../authorize';
import AjaxPromise from './../../utils/ajax-promise';

export default AuthorizeRoute.extend({
  model: function() {
    var _this = this;
    var offerId = this.modelFor('reviewOffer').get('id');
    var currentOffer = this.store.getById('offer', offerId);
    var donor = currentOffer.get('createdBy');

    return new AjaxPromise("/offers/donor_offers", "GET", this.get('session.authToken'), {donor: donor.get('id')})
      .then(function(data) {
        _this.store.pushPayload(data);

        return _this.store.filter('offer', function(offer) {
          return offer.get('createdBy') === donor && offer.get('state') !== "draft" && offer.get("id") !== currentOffer.get("id");
        });
      });
  },

  setupController: function(controller, model){
    controller.set("model", model);
    controller.set("donor", model.get('firstObject.createdBy'));
  }

});
