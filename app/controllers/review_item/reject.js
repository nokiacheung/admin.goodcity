import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ["review_item", "offer", "sendMessage"],

  itemTypeId: Ember.computed.alias('controllers.review_item.itemTypeId'),
  itemId: Ember.computed.alias('controllers.review_item.id'),

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
      var reasonId = this.get('rejectionReason.id');
      if(reasonId) { return reasonId; }
      else {
        if(this.get("rejectReason") && this.get("rejectReason").length > 0) {
          return "-1";
        }
      }
    }
  }.property('rejectionReason.id'),

  rejectionOptions: function() {
    return this.store.all('rejection_reason').sortBy('id');
  }.property(),

  actions: {
    setRejectOption: function(){
      this.set("selectedId", "-1");
    },

    rejectOffer: function(){
      var selectedReason = this.get('selectedId');
      if(selectedReason === undefined) {
        this.set('noReasonSelected', true);
        return false;
      }

      var rejectProperties = this.getProperties('rejectReason');
      rejectProperties.rejectionComments = Ember.$('#rejectMessage').val();

      if(selectedReason === "-1" && Ember.$.trim(rejectProperties.rejectReason).length === 0) {
        this.set("isBlank", true);
        return false; }

      if(selectedReason !== "-1") {
        rejectProperties.rejectReason = null;
        this.set('rejectReason', null); }

      var loadingView = this.container.lookup('view:loading').append();
      rejectProperties.rejectionReason = this.store.getById('rejection_reason', selectedReason);
      rejectProperties.state_event = 'reject';

      var item_id = this.get('controllers.review_item.id');
      rejectProperties.id = item_id;

      var offer_id = this.get('controllers.offer').get('id');
      rejectProperties.offer = this.store.getById('offer', offer_id);
      rejectProperties.itemType = this.store.getById('item_type', this.get('itemTypeId'));

      var item = this.store.push('item', rejectProperties);

      // Save changes to Item
      var route = this;
      item.save().then(function() {
        loadingView.destroy();
        route.transitionToRoute('review_offer.items');
      });
    },
  }

});
