import Ember from 'ember';
import OfferListController from './../offer_list';

export default OfferListController.extend({
  sortProperties: ["unreadMessagesCount:desc", "reviewCompletedAt:desc"],
  arrangedContent: Ember.computed.sort("model", "sortProperties"),
});
