import Ember from 'ember';

export default Ember.Controller.extend({

  application: Ember.inject.controller(),
  store: Ember.inject.service(),
  i18n: Ember.inject.service(),
  defaultPackage: Ember.computed.alias('model.packageType'),
  item: Ember.computed.alias('model'),

  itemDescriptionPlaceholder: Ember.computed(function(){
    return this.get("i18n").t("items.add_item.description_placeholder").string;
  }),

  formData: Ember.computed("model.donorCondition", "model.donorDescription", {
    get: function() {
      return {
        donorConditionId: this.get("model.donorCondition.id"),
        donorDescription: this.get("model.donorDescription")
      };
    },
    set: function(key, value) {
      return value;
    }
  }),

  displayEditLink: Ember.computed("application.currentRouteName", function(){
    return this.get("application.currentRouteName").indexOf("accept") >= 0;
  }),

  isEditing: Ember.computed('item', 'item.donorDescription', 'item.donorCondition', {
    get: function() {
      var item = this.get('item');
      var description = Ember.$.trim(item.get('donorDescription'));
      return !(item.get('donorCondition') && description.length > 0);
    },
    set: function(key, value) {
      return value;
    }
  }),

  itemTypeId: Ember.computed('defaultPackage', {
    get: function() {
      return this.get('defaultPackage.id');
    },
    set: function(key, value) {
      return value;
    }
  }),

  itemTypes: Ember.computed(function(){
    return this.get("store").peekAll('package_type').sortBy('name');
  }),

  actions: {
    setEditing(value) {
      this.set("isEditing", value);
    },

    copyItem() {
      var loadingView = this.container.lookup('component:loading').append();
      var _this = this;
      var item = _this.get("model");
      var images = item.get("images");
      var promises = [];

      var newItem = _this.get("store").createRecord("item", {
        offer: item.get('offer'),
        donorCondition: item.get('donorCondition'),
        state: "draft",
        packageType: item.get("packageType"),
        donorDescription: item.get('donorDescription')
      });

      newItem.save()
        .then(() => {
          images.forEach(function(image){
            var newImage = _this.get("store").createRecord('image', {
              cloudinaryId: image.get('cloudinaryId'),
              item: newItem,
              favourite: image.get('favourite')
            });
            promises.push(newImage.save());
          });

          Ember.RSVP.all(promises).then(function(){
            loadingView.destroy();
            _this.transitionToRoute('item.edit_images', newItem);
          });
        });
    },
  }
});
