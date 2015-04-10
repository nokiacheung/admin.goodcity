import Ember from 'ember';
import startApp from '../helpers/start-app';
import syncDataStub from '../helpers/empty-sync-data-stub';

var TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);
var App, testHelper, user, offer1, offer2, offer3, offer4;

module('Reviewer: Display Donor Details Tab', {
  setup: function() {
    App = startApp({}, 2);
    testHelper = TestHelper.setup(App);

    user   = FactoryGuy.make("user");
    offer1 = FactoryGuy.make("offer_with_items", { state:"under_review", createdBy: user});
    offer2 = FactoryGuy.make("offer_with_items", { state:"submitted", createdBy: user});
    offer3 = FactoryGuy.make("offer_with_items", { state:"received", createdBy: user});
    offer4 = FactoryGuy.make("offer_with_items", { state:"draft", createdBy: user});
  },

  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("item status badge on item-image", function() {
  visit("/offers/1/review_offer/donor_details");
  andThen(function() {
    equal(currentURL(), "/offers/1/review_offer/donor_details");

    equal($(".donor_details .no-avatar").text(), "K");
    equal($(".donor_details .donor").text().indexOf('Kendrick Kiehn') >= 0, true);
    equal($.trim($(".donor_details .donor").text()).indexOf('5111 1111') >= 0, true);
    equal($(".donor_details li").length, 4);
    equal($.trim($(".donor_details .row .row:eq(4)").text()).indexOf('Total offers') >= 0, true);
    equal($.trim($(".donor_details .row .row:eq(4)").text()).indexOf('5') >= 0, true);
  });
});
