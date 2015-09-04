import Ember from 'ember';
import OfferListController from './../offer_list';

export default OfferListController.extend({
  sortProperties: ["reviewedAt:desc"],
  arrangedContent: Ember.computed.sort("model", "sortProperties"),
});
