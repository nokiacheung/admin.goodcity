import Ember from "ember";

export default Ember.ObjectController.extend({
  needs: ["offer"],
  noImage: Ember.computed.empty("images"),
  previewImage: null,
  addPhotoLabel: Ember.I18n.t("items.edit_images.add_photo"),
  isReady: false,
  isExpanded: false,

  images: function() {
    //The reason for sorting is because by default it's ordered by favourite
    //then id order. If another image is made favourite then deleted the first image
    //by id order is made favourite which can be second image in list which seems random.

    //Sort by id ascending except place new images id = 0 at end
    return (this.get("model.images") || Ember.A()).toArray().sort(function(a,b) {
      a = parseInt(a.get("id"));
      b = parseInt(b.get("id"));
      if (a === 0) { return 1; }
      if (b === 0) { return -1; }
      return a - b;
    });
  }.property("model.images.[]"),

  favouriteImage: function() {
    return this.get("images").filterBy("favourite").get("firstObject");
  }.property("images.@each.favourite"),

  initPreviewImage: function() {
    var image = this.get("displayImage");
    if (image) {
      this.send("setPreview", image);
    }
  }.observes("model"),

  //css related
  previewImageBgCss: function() {
    var css = this.get("instructionBoxCss");
    if (!this.get("previewImage")) {
      return css;
    }
    return css + "background-image:url(" + this.get("previewImage.imageUrl") + ");" +
      "background-size: " + (this.get("isExpanded") ? "contain" : "cover") + ";";
  }.property("previewImage", "isExpanded"),

  instructionBoxCss: function() {
    var height = Ember.$(window).height() * 0.6;
    return "min-height:" + height + "px;";
  }.property("previewImage", "isExpanded"),

  thumbImageCss: function() {
    var imgWidth = Math.min(120, Ember.$(window).width() / 4 - 14);
    return "width:" + imgWidth + "px; height:" + imgWidth + "px;";
  }.property(),

  actions: {
    next: function() {
      this.transitionToRoute("item.edit");
    },

    back: function() {
      if(this.get('offer.itemCount') === 0){
        this.transitionToRoute("offers");
      } else {
        this.transitionToRoute("offer.offer_details");
      }
    },

    setPreview: function(image) {
      this.get("images").setEach("selected", false);
      image.set("selected", true);
      this.set("previewImage", image);
    },

    setFavourite: function() {
      this.get("images").setEach("favourite", false);
      this.get("previewImage").set("favourite", true).save();
    },

    deleteImage: function() {
      var _this = this;
      if (this.get("images.length") === 1) {
        window.alert(Ember.I18n.t("items.edit_images.cant_delete_last_image"));
        return;
      }
      if (window.confirm(Ember.I18n.t("items.edit_images.delete_confirm"))) {
        var loadingView = this.container.lookup('view:loading').append();
        this.get("previewImage").destroyRecord().then(function() {
          _this.initPreviewImage();
          if (!_this.get("favouriteImage")) {
            _this.send("setFavourite");
          }
        }).finally(function() {
          loadingView.destroy();
        });
      }
    },

    expandImage: function() {
      var value = this.get("isExpanded");
      this.set("isExpanded", !value);
    },

    //file upload
    triggerUpload: function() {
      if(navigator.userAgent.match(/iemobile/i))
      {
        //don't know why but on windows phone need to click twice in quick succession
        //for dialog to appear
        Ember.$("#photo-list input[type='file']").click().click();
      }
      else
      {
        Ember.$("#photo-list input[type='file']").click();
      }
    },

    uploadReady: function() {
      this.set("isReady", true);
    },

    uploadProgress: function(e, data) {
      var progress = parseInt(data.loaded / data.total * 100, 10) || 0;
      this.set("addPhotoLabel", progress + "%");
    },

    uploadComplete: function() {
      this.set("addPhotoLabel", Ember.I18n.t("items.edit_images.add_photo"));
    },

    uploadSuccess: function(e, data) {
      var identifier = data.result.version + "/" + data.result.public_id + "." + data.result.format;
      var _this = this;
      if (this.get("noImage")) {
        var offer = this.get("controllers.offer.model");
        var defaultDonorCondition = this.store.all("donorCondition").sortBy("id").get("firstObject");
        var item = this.store.createRecord("item", {offer:offer,donorCondition:defaultDonorCondition,state:"draft"});
        item.save().then(function() {
          _this.store.createRecord('image', {cloudinaryId: identifier, item: item, favourite: true})
            .save().then(function() { _this.transitionToRoute("item.edit_images", item.get("id")); });
        });
      } else {
        _this.store.createRecord('image', {cloudinaryId: identifier, item: _this.get("model")}).save();
      }
    }
  }
});
