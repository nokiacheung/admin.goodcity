import Ember from 'ember';
import AjaxPromise from './../utils/ajax-promise';
import recordsUtil from './../utils/records';

export default Ember.Controller.extend({
  offer: Ember.computed.alias('model'),
  isStartReviewClicked: false,
  confirm: Ember.inject.service(),

  offerReadyForClosure: function() {
    return !this.get("model.allItemsRejected") &&
      this.get("model.state") !== "received" &&
      this.get("model.packages.length") > 0 &&
      this.get("model.packages").filter(p => !p.get("item.isRejected") && p.get("state") === "expecting").get("length") === 0;
  }.property("model.state", "model.packages.@each.state"),

  actions: {
    addItem: function() {
      var draftItemId = this.get("model.items").filterBy("state", "draft").get("firstObject.id") || "new";
      this.transitionToRoute('item.edit_images', draftItemId);
    },

    startReview: function() {
      if(this.get("isStartReviewClicked")) { return; }
      var offer = this.store.getById('offer', this.get('offer.id'));
      this.set("isStartReviewClicked", true);
      var adapter = this.container.lookup('adapter:application');
      var url = adapter.buildURL('offer', offer.get('id')) + '/review';

      adapter.ajax(url, 'PUT')
        .then(data => this.store.pushPayload(data))
        .finally(() => this.set("isStartReviewClicked", false));
    },

    closeOffer: function(){
      var loadingView = this.container.lookup('view:loading').append();
      var offerId = this.get('model.id');
      var offerProperties = {id: offerId, state_event: 'close'};
      var url = "/offers/" + offerId + "/close_offer";

      new AjaxPromise(url, "PUT", this.get('session.authToken'), {offer: offerProperties})
        .then(data => {
          this.store.pushPayload(data);
          this.transitionToRoute('review_offer.items');
        })
        .finally(() => loadingView.destroy());
    },

    cancelOffer: function(){
      var offer = this.get("model");
      this.get("confirm").show(Ember.I18n.t("delete_confirm"), () => {
        var loadingView = this.container.lookup('view:loading').append();
        offer.deleteRecord();
        offer.save()
          .then(() => {
            recordsUtil.unloadRecordTree(offer);
            this.transitionToRoute('my_list');
          })
          .catch(error => { offer.rollback(); throw error; })
          .finally(() => loadingView.destroy());
        });
    },
  }
});
