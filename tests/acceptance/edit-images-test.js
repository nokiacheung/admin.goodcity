import Ember from 'ember';
import startApp from '../helpers/start-app';
import syncDataStub from '../helpers/empty-sync-data-stub';
import '../fixtures/item';
import '../fixtures/image';

var TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);
var App, testHelper;
var offer, item, img1, img2, edit_images_url;

module('Edit Images', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);
    syncDataStub(testHelper);

    $.mockjax({url:"/api/v1/images/generate_signatur*",responseText:{
      "api_key":   "1111",
      "callback":  "/public/cloudinary_cors.html",
      "signature": "0000",
      "timestamp": 1407854176
    }});

    offer = FactoryGuy.make("offer");
    item = FactoryGuy.make("item",{offer:offer, state: "draft"});
    img1 = FactoryGuy.make("image", {item:item,favourite:true});
    img2 = FactoryGuy.make("image", {item:item,favourite:false});
    edit_images_url = "/offers/" + offer.id + "/items/" + item.id + "/edit_images";
  },

  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

// Display previously uploaded images from item in draft state
test("Add Image: display previously added images", function() {
  expect(4);

  visit("/offers/" + offer.id);
  andThen(function() {
    click("a:contains('Add item')");

    andThen(function() {
      equal(currentURL(), edit_images_url);

      // preview-image
      equal(find('#main-image > div').css('background-image'), "url(" + img1.get("imageUrl") + ")");

      // thumbnail-image-list
      equal(find("#photo-list img").length, 2);

      // favourite-image
      equal(find("#photo-list .fa-star:not(.hidden)").prev().attr("src"), img1.get("thumbImageUrl"));
    });
  });
});

test("Clicking on thumbnail image should change preview-image", function() {
  expect(3);

  visit(edit_images_url);

  andThen(function() {
    equal(currentURL(), edit_images_url);

    // preview-image
    equal(find('#main-image > div').css('background-image'), "url(" + img1.get("imageUrl") + ")");

    // find other thumbnail-image
    click("#photo-list .fa-star.hidden");

    andThen(function(){
      equal(find('#main-image > div').css('background-image'), "url(" + img2.get("imageUrl") + ")");
    });
  });
});

test("Change favourite image", function() {
  expect(3);

  testHelper.handleUpdate("image", img2.id);
  visit(edit_images_url);

  andThen(function() {
    equal(currentURL(), edit_images_url);

    // favourite-image
    equal(find("#photo-list .fa-star:not(.hidden)").prev().attr("src"), img1.get("thumbImageUrl"));
  });

  // find other thumbnail-image
  click("#photo-list .fa-star.hidden");
  click("#main-image-controls .fa-star-o");

  andThen(function(){
    equal(find("#photo-list .fa-star:not(.hidden)").prev().attr("src"), img2.get("thumbImageUrl"));
  });
});

test("Can't proceed if no images", function() {
  expect(2);

  item = FactoryGuy.make("item",{offer:offer});
  edit_images_url = "/offers/" + offer.id + "/items/" + item.id + "/edit_images";

  visit(edit_images_url);

  andThen(function() {
    equal(currentURL(), edit_images_url);

    equal(find("button:contains('Next')").prop("disabled"), true);
  });
});

test("Set another image as favourite if favourite image deleted", function() {
  expect(5);

  testHelper.handleDelete('image', img1.id);
  testHelper.handleUpdate("image", img2.id);

  visit(edit_images_url);

  andThen(function() {
    equal(currentURL(), edit_images_url);

    equal(find("#photo-list img").length, 2);

    equal(find("#photo-list .fa-star:not(.hidden)").prev().attr("src"), img1.get("thumbImageUrl"));
  });

  click("#main-image-controls .fa-trash");

  andThen(function() {
    equal(find("#photo-list img").length, 1);

    equal(find("#photo-list .fa-star:not(.hidden)").prev().attr("src"), img2.get("thumbImageUrl"));
  });
});

test("Can't delete last image", function() {
  expect(2);

  item = FactoryGuy.make("item",{offer:offer});
  img1 = FactoryGuy.make("image", {item:item,favourite:true});
  edit_images_url = "/offers/" + offer.id + "/items/" + item.id + "/edit_images";

  visit(edit_images_url);

  andThen(function() {
    equal(currentURL(), edit_images_url);
  });

  click("#main-image-controls .fa-trash");

  andThen(function() {
    equal(find("#photo-list img").length, 1);
  });
});
