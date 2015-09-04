import OfferListController from './../offer_list';

export default OfferListController.extend({
  sortProperties: ['submittedAt'],
  sortAscending: false,
  newOffers: true
});
