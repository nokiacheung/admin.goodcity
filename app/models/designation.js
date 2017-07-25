import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({

  status:       attr('string'),
  createdAt:    attr('date'),
  recentlyUsedAt: attr('date'),
  code:         attr('string'),
  activity:     attr('string'),
  description:  attr('string'),
  detailType:   attr('string'),
  detailId:     attr('number'),

  ordersPackages:    hasMany('ordersPackages', { async: false }),


  isLocalOrder: Ember.computed.equal('detailType', 'LocalOrder'),

  designatedOrdersPackages: Ember.computed('ordersPackages.@each.state', function() {
    return this.get("ordersPackages").filterBy('state', "designated");
  }),

  dispatchedOrdersPackages: Ember.computed('ordersPackages.@each.state', function() {
    return this.get("ordersPackages").filterBy('state', "dispatched");
  }),

  designatedItems: Ember.computed('items.@each.sentOn', function() {
    return this.get("items").filterBy('sentOn', null);
  }),

  isInactive: Ember.computed('status', function(){
    return ["Sent", "Cancelled", "Closed"].indexOf(this.get("status")) >= 0;
  })

});
