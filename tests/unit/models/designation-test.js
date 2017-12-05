import { test, moduleForModel } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('designation', 'Designation Model', {
  needs: ['model:orders_package', 'model:package']
});

test('check attributes', function(assert){
  assert.expect(8);
  var model = this.subject();
  var detailId = Object.keys(model.toJSON()).indexOf('detailId') > -1;
  var detailType = Object.keys(model.toJSON()).indexOf('detailType') > -1;
  var description = Object.keys(model.toJSON()).indexOf('description') > -1;
  var activity = Object.keys(model.toJSON()).indexOf('activity') > -1;
  var code = Object.keys(model.toJSON()).indexOf('code') > -1;
  var recentlyUsedAt = Object.keys(model.toJSON()).indexOf('recentlyUsedAt') > -1;
  var createdAt = Object.keys(model.toJSON()).indexOf('createdAt') > -1;
  var status = Object.keys(model.toJSON()).indexOf('status') > -1;

  assert.ok(status);
  assert.ok(createdAt);
  assert.ok(recentlyUsedAt);
  assert.ok(code);
  assert.ok(activity);
  assert.ok(description);
  assert.ok(detailType);
  assert.ok(detailId);
});

test('Relationships with other models', function(assert){
  assert.expect(2);

  var designation = this.store().modelFor('designation');
  var relationshipsWithDistrict = Ember.get(designation, 'relationshipsByName').get('ordersPackages');

  assert.equal(relationshipsWithDistrict.key, 'ordersPackages');
  assert.equal(relationshipsWithDistrict.kind, 'hasMany');
});

test('designatedOrdersPackages function returns designated ordersPackages', function(assert){
  assert.expect(2);
  var orders_package1, orders_package2, orders_package3, designatedOrdersPackagesIds, model, store;
  model = this.subject();
  store = this.store();

  Ember.run(function(){
    orders_package1 = store.createRecord('orders_package', {id: 1, state: 'designated'});
    orders_package2 = store.createRecord('orders_package', {id: 2, state: 'designated'});
    orders_package3 = store.createRecord('orders_package', {id: 3, state: 'dispatched'});
    model.get('ordersPackages').pushObjects([orders_package1, orders_package2, orders_package3]);
  });

  designatedOrdersPackagesIds = model.get('designatedOrdersPackages').getEach('id');

  assert.equal(designatedOrdersPackagesIds.get('length'),2);
  assert.equal(Ember.compare(designatedOrdersPackagesIds, [orders_package1.get('id'), orders_package2.get('id')]), 0);
});


// test('check dispatchedOrdersPackages returns only dispatched orders_packages', function(assert){
//   assert.expect(2);
//   var orders_package1, orders_package2, orders_package3, dispatchedOrdersPackagesIds, model, store;
//   model = this.subject();
//   store = this.store();

//   Ember.run(function(){
//     orders_package1 = store.createRecord('ordersPackage', {id: 1, state: 'dispatched'});
//     orders_package2 = store.createRecord('orders_package', {id: 2, state: 'dispatched'});
//     orders_package3 = store.createRecord('orders_package', {id: 3, state: 'designated'});
//     model.get('ordersPackages').pushObjects([orders_package1, orders_package2, orders_package3]);
//   });

//   dispatchedOrdersPackagesIds = model.get('dispatchedOrdersPackages').getEach('id');
//   assert.equal(dispatchedOrdersPackagesIds.get('length'),2);
//   assert.equal(Ember.compare(dispatchedOrdersPackagesIds, [orders_package1.get('id'), orders_package2.get('id')]), 0);
// });

// test('check designatedItems returns items with sentOn null', function(assert){
//   assert.expect(2);
//   var item1, item2, item3, designatedItemsIds, model, store;
//   model = this.subject();
//   store = this.store();

//   Ember.run(function(){
//     item1 = store.createRecord('item', { id: 1, sentOn: null });
//     item2 = store.createRecord('item', { id: 2, sentOn: null });
//     item3 = store.createRecord('item', { id: 3, sentOn: "12/07/2016" });
//     model.get('items').pushObjects([item1, item2, item3]);
//   });

//   designatedItemsIds = model.get('designatedItems').getEach('id');
//   assert.equal(designatedItemsIds.get('length'), 2);
//   assert.equal(Ember.compare(designatedItemsIds, [item1.get('id'), item2.get('id')]), 0);
// });

// test('check isInactive returns true if status is Cancelled or Closed', function(assert){
//   var model = this.subject({status: 'Cancelled'});

//   assert.equal(model.get('isInactive'), false);
// });
