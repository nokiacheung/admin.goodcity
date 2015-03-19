import Ember from 'ember';

export default Ember.ObjectController.extend({
  sortProperties: ["latestUpdatedTime:desc"],
  sortedItems: Ember.computed.sort("offerAndItems", "sortProperties"),

  offerAndItems: function() {
    // avoid deleted-items which are not persisted yet.
    var elements = this.get('items').rejectBy('state', 'draft').rejectBy('isDeleted', true).toArray();

    // add offer to array for general messages display
    elements.push(this);
    return elements;
  }.property('items.@each.state'),

  actions: {
    handleBrokenImage: function() {
      this.get("reviewedBy").set("hasImage", null);
    },
  }
});
