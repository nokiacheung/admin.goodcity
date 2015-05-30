import Ember from 'ember';

import ItemBaseController from "../item/edit_images";

export default ItemBaseController.extend({

  offerId: Ember.computed.alias("model.item.offer.id"),
  itemId: Ember.computed.alias("model.item.id"),
  packageId: Ember.computed.alias("model.id"),

  actions: {
    next: function() {
      this.transitionToRoute("review_item.accept", this.get("model.item.id"));
    }
  }
});
