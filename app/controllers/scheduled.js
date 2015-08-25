import Ember from 'ember';
import scheduledOffersMixin from './../mixins/scheduled_offers';

export default Ember.ArrayController.extend(scheduledOffersMixin, {
  collectionCount: Ember.computed.alias("collection.length"),
  ggvCount:        Ember.computed.alias("ggv.length"),
  dropOffCount:    Ember.computed.alias("dropOff.length"),
});
