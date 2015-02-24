import Ember from 'ember';
import startApp from '../helpers/start-app';
import syncDataStub from '../helpers/empty-sync-data-stub';

var TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);
var App, testHelper, offer, item1, item2, package1, package2;

module('Reviewer: Accept Item Tab', {
  setup: function() {
    App = startApp({}, 2);
    testHelper = TestHelper.setup(App);

    offer = FactoryGuy.make("offer", { state:"under_review"});
    item1 = FactoryGuy.make("item_with_type", { offer: offer});
    item2 = FactoryGuy.make("item", { offer: offer});
    package1 = FactoryGuy.make("package", { item: item1, packageType: item1.get('itemType')});
    package2 = FactoryGuy.make("package", { item: item1, packageType: item1.get('itemType')});
  },

  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
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

test("visit rejected item with item_type", function() {
  visit("/offers/" + offer.id + "/review_item/" + item1.id + "/accept");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item1.id + "/accept");
    equal($('.select2-chosen').text(), item1.get('itemType.name'));

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

  });
});

