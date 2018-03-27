import Ember from 'ember';
import startApp from '../helpers/start-app';
import { module, test } from 'qunit';
import '../factories/role';
import FactoryGuy from 'ember-data-factory-guy';

var App, role;

module('Display review Item', {
  beforeEach: function() {
    App = startApp({}, 2);
    role = FactoryGuy.make("role");
    $.mockjax({url: '/api/v1/role*', type: 'GET', status: 200,responseText: {
      roles: [role.toJSON({includeId: true})]
      }
    });
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test("Display Item under review", function(assert) {
  assert.expect(6);
  visit("/offers/1/review_item/4");

  andThen(function(){
    assert.equal(currentURL(), "/offers/1/review_item/4/accept");
    assert.equal(/Review Item:/i.test($('body').text()), true);
    assert.equal(/Velit fugit amet quos ut minima quis/i.test($('body').text()), true);
    assert.equal(/Condition: New/i.test($('body').text()), true);
    assert.equal($('.item_lable_input input').val(), "");
    assert.equal(find("img.thumb").length, 1);
  });
});

test("Back button redirects to review offer page", function(assert) {
  assert.expect(1);
  visit("/offers/1/review_item/4");
  click("a:contains('Back')");

  andThen(function() {
    assert.equal(currentURL(), "/offers/1/review_offer/items");
  });
});
