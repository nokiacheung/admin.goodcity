import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";

export default Ember.Controller.extend({

  review_item: Ember.inject.controller(),
  offer: Ember.inject.controller(),

  itemTypeId: Ember.computed.alias('review_item.itemTypeId'),
  itemId: Ember.computed.alias('review_item.model.id'),
  rejectionReasonId: Ember.computed.alias('model.rejectionReason.id'),
  rejectReasonPlaceholder: t("reject.custom_reason"),
  i18n: Ember.inject.service(),

  rejectReason: function(key, value){
    return (arguments.length >1) ? value : this.get('review_item.model.rejectReason');
  }.property('itemId'),

  isBlank: function(key, value){
    return (arguments.length >1) ? value : false;
  }.property(),

  noReasonSelected: function(key, value){
    return (arguments.length >1) ? value : false;
  }.property(),

  selectedId: function(key, value){
    this.set("isBlank", false);
    if(arguments.length > 1) {
      this.set('noReasonSelected', false);
      return value;
    } else {
      var reasonId = this.get('rejectionReasonId');
      if(reasonId) { return reasonId; }
      else {
        if(this.get("rejectReason") && this.get("rejectReason").length > 0) {
          return "-1";
        }
      }
    }
  }.property('rejectionReasonId'),

  rejectionOptions: function() {
    return this.store.peekAll('rejection_reason').sortBy('id');
  }.property(),

  confirm: Ember.inject.service(),

  actions: {
    setRejectOption: function(){
      this.set("selectedId", "-1");
    },

    rejectItem: function(){
      var selectedReason = this.get('selectedId');
      if(selectedReason === undefined) {
        this.set('noReasonSelected', true);
        return false;
      }

      var rejectProperties = this.getProperties('rejectReason');
      rejectProperties.rejectionComments = Ember.$('#rejectMessage').val();

      if(selectedReason === "-1" && Ember.$.trim(rejectProperties.rejectReason).length === 0) {
        this.set("isBlank", true);
        return false;
      }

      if(selectedReason !== "-1") {
        rejectProperties.rejectReason = null;
        this.set('rejectReason', null);
      }

      var offer = this.get("offer.model");

      var saveItem = () => {
        var loadingView = this.container.lookup('view:loading').append();
        rejectProperties.rejectionReason = this.store.peekRecord('rejection_reason', selectedReason);
        rejectProperties.state_event = 'reject';
        rejectProperties.id = this.get('itemId');

        rejectProperties.offer = offer;
        rejectProperties.itemType = this.store.peekRecord('package_type', this.get('itemTypeId'));

        var item = this.store.push('item', rejectProperties);

        // Save changes to Item
        item.save()
          .then(() => this.transitionToRoute('review_offer.items'))
          .catch(error => {
            item.rollback();

            if (error.errors instanceof Array &&
              error.errors.filter(e => !!e["requires_gogovan_cancellation"]).length > 0) {
              return this.transitionToRoute('offer.cancel_gogovan', offer);
            }

            throw error;
          })
          .finally(() => loadingView.destroy());
      };

      // if rejecting last accepted item but gogovan is booked display gogovan cancellation page
      var gogovanOrder = offer.get("delivery.gogovanOrder");
      var itemIsLastAccepted = offer.get("approvedItems").every(i => i.id === this.get('itemId'));

      if (itemIsLastAccepted && gogovanOrder) {
        this.get("confirm").show(this.get("i18n").t("reject.cancel_gogovan_confirm"), () => {
          if (gogovanOrder.get("isActive")) {
            this.transitionToRoute('offer.cancel_gogovan', offer);
          } else {
            saveItem();
          }
        });
      } else {
        saveItem();
      }
    }
  }
});
