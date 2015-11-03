import Ember from 'ember';
import startApp from '../helpers/start-app';
import FactoryGuy from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';

var App, offer, item1, item2, package1, package2, item3, package3,
  item4, package4;

module('Reviewer: Accept Item Tab', {
  setup: function() {
    App = startApp({}, 2);
    TestHelper.setup();

    offer = FactoryGuy.make("offer", { state:"under_review"});
    item1 = FactoryGuy.make("item_with_type", { offer: offer, state: "accepted"});
    package1 = FactoryGuy.make("package", { item: item1, packageType: item1.get('packageType')});
    package2 = FactoryGuy.make("package", { item: item1, packageType: item1.get('packageType')});

    item2 = FactoryGuy.make("item", { offer: offer});

    item3 = FactoryGuy.make("item_with_type", { offer: offer, donorDescription: null, donorCondition: null });
    package3 = FactoryGuy.make("package", { item: item3, packageType: item3.get('packageType')});

    item4 = FactoryGuy.make("item_with_type", { offer: offer, state: "rejected" });
    package4 = FactoryGuy.make("package", { item: item4, packageType: item4.get('packageType')});
  },

  teardown: function() {
    Em.run(function() { TestHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("visit accept item tab without item_type", function() {
  visit("/offers/" + offer.id + "/review_item/" + item2.id + "/accept");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item2.id + "/accept");
    equal($('.select2-chosen').text(), "Add item label");
    equal($('p.no-items').text(), "Please choose Item Type first!");
  });
});

test("visit accepted item with item_type", function() {
  visit("/offers/" + offer.id + "/review_item/" + item1.id + "/accept");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item1.id + "/accept");
    equal($('.select2-chosen').text(), item1.get('packageType.name'));

    // two package components
    equal($(".detail_container").length, 2);

    // display name of selected package type
    equal($.trim($(".detail_container:eq(0)").text()).indexOf(package1.get('packageType.name')) > 0, true);

    equal($.trim($(".detail_container:eq(1)").text()).indexOf(package2.get('packageType.name')) > 0, true);

    // display package component notes
    equal($(".detail_container:eq(0) input[name='comment']").val(), package1.get('notes'));
    equal($(".detail_container:eq(1) input[name='comment']").val(), package2.get('notes'));

    // display quantity value
    equal(parseInt($(".detail_container:eq(0) input[name='qty']").val()), package1.get('quantity'));
    equal(parseInt($(".detail_container:eq(1) input[name='qty']").val()), package2.get('quantity'));

    // display length value
    equal(parseInt($(".detail_container:eq(0) input[name='length']").val()), package1.get('length'));
    equal(parseInt($(".detail_container:eq(1) input[name='length']").val()), package2.get('length'));

    // display width value
    equal(parseInt($(".detail_container:eq(0) input[name='width']").val()), package1.get('width'));
    equal(parseInt($(".detail_container:eq(1) input[name='width']").val()), package2.get('width'));

    // display height value
    equal(parseInt($(".detail_container:eq(0) input[name='height']").val()), package1.get('height'));
    equal(parseInt($(".detail_container:eq(1) input[name='height']").val()), package2.get('height'));

    // Display buttons
    equal($(".accept_buttons button").length, 1);

    // Item Details
    equal($(".edit-item-link").length, 1);
    equal($('.item-details textarea').length, 0);
    equal($('.item-details .radio-buttons li').length, 0);

    // Display Item Details Form
    click($(".edit-item-link"));
    andThen(function(){
      equal($('.item-details textarea').val(), item1.get('donorDescription'));
      equal($('.item-details .radio-buttons li').length, 4);
    });
  });
});

test("visit submitted item with item_type", function() {
  visit("/offers/" + offer.id + "/review_item/" + item3.id + "/accept");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item3.id + "/accept");
    equal($('.select2-chosen').text(), item3.get('packageType.name'));

    // one package components
    equal($(".detail_container").length, 1);

    // Display buttons
    equal($(".accept_buttons button").length, 2);

    // Item Details Form
    click($(".edit-item-link"));
    andThen(function(){
      equal($('.item-details textarea').val(), "");
      equal($('.item-details .radio-buttons li').length, 4);
    });
  });
});

test("visit rejected item with item_type", function() {
  visit("/offers/" + offer.id + "/review_item/" + item4.id + "/accept");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item4.id + "/accept");
    equal($('.select2-chosen').text(), item4.get('packageType.name'));

    // one package components
    equal($(".detail_container").length, 1);

    // Display buttons
    equal($(".accept_buttons button").length, 2);
  });
});

test("visit rejected item page", function() {
  visit("/offers/" + offer.id + "/review_item/" + item4.id + "/reject");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item4.id + "/reject");
    equal($('.select2-chosen').text(), item4.get('packageType.name'));

    // hide item-edit link
    equal($(".edit-item-link").length, 0);
  });
});
