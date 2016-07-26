import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),
  displayUserPrompt: false,
  images: Ember.computed.alias("package.item.images"),
  selectedImage: null,

  actions: {

    selectImage(image) {
      this.get("images").setEach("selected", false);
      image.set("selected", true);
      this.set("selectedImage", image);
    },

    setPackageImage() {
      var image = this.get("selectedImage");
      this.get("package").favouriteImage = image;
      this.sendAction("setPackageImage", this.get("index"), image);
    },

    displayImagesListOverlay() {
      if(this.get("images").length > 0) {
        this.set("displayUserPrompt", true);
        this.send("selectImage", this.get("package.favouriteImage"));
      }
    },
  },

});
