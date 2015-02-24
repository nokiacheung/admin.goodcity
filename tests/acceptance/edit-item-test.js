import Ember from 'ember';
import startApp from '../helpers/start-app';
import syncDataStub from '../helpers/empty-sync-data-stub';

var TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);
var App, testHelper, offer, item;

module('Edit Item', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);
    syncDataStub(testHelper);

    offer = FactoryGuy.make("offer", { state: "draft" });
    item = FactoryGuy.make("item",{ offer:offer, state: "draft" });
    FactoryGuy.makeList("donor_condition", 2);
  },

  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("Create Item with details", function() {
  expect(4);

  var edit_item_url = "/offers/" + offer.id + "/items/" + item.id + "/edit";
  visit(edit_item_url);

  andThen(function() {
    equal(currentURL(), edit_item_url);
  });

  fillIn("textarea[name=donorDescription]", "this is test item");
  click(":radio[value=1]");

  andThen(function() {
    equal(find("textarea[name=donorDescription]").val(), "this is test item");
  });

  testHelper.handleUpdate("item", item.id);
  click("button:contains('Save Details')");
  Ember.run(function(){ item.set("state", "submitted"); });

  andThen(function(){
    equal(currentURL(), "/offers/" + offer.id + "/offer_details");
    equal($('.item-content li:eq(0) .ellipsis').text(), "this is test item");
  });
});
