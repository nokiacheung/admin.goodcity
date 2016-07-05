import Ember from 'ember';

import ItemBaseController from "../item/edit_images";

export default ItemBaseController.extend({

  offerId: Ember.computed.alias("model.item.offer.id"),
  itemId: Ember.computed.alias("model.item.id"),
  packageId: Ember.computed.alias("model.id"),
  images: Ember.computed.alias("model.item.images"),
  item: Ember.computed.alias("model.item"),

  package: Ember.computed.alias("model"),

  actions: {
    next() {
      this.transitionToRoute("review_item.accept", this.get("model.item.id"));
    }
  }
});
