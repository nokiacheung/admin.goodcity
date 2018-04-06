// import Ember from 'ember';
// import { module, test } from 'qunit';
// import '../factories/offer';
// import '../factories/role';
// import '../factories/user';
// import startApp from '../helpers/start-app';
// import FactoryGuy from 'ember-data-factory-guy';
// import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';

// var App, offer, offer1, reviewer1, role;

// module('App Menu', {
//   beforeEach: function() {
//     App = startApp({}, 2);
//     TestHelper.setup();

//     role = FactoryGuy.make("role");
//     $.mockjax({url: '/api/v1/role*', type: 'GET', status: 200,responseText: {
//       roles: [role.toJSON({includeId: true})]
//       }
//     });

//     reviewer1 = FactoryGuy.make("user", {isReviwer: true});
//     window.localStorage.currentUserId = reviewer1.id;
//     offer = FactoryGuy.make("offer_with_items", { state: "under_review", reviewed_by: reviewer1 });
//     offer1 = FactoryGuy.make("offer_with_items", { state: "is_reviewed", reviewed_by: reviewer1 });
//   },
//   afterEach: function() {
//     Em.run(function() { TestHelper.teardown(); });
//     Ember.run(App, 'destroy');
//   }
// });

// test("In progress tab count", function(assert) {
//   assert.expect(2);
//   visit("/offers/in_progress/reviewing");

//   andThen(function(){
//     assert.equal(currentURL(), "/offers/in_progress/reviewing");
//     assert.equal(find('a[href="/offers/in_progress"]').text(), "In Progress (2)");
//   });
// });
