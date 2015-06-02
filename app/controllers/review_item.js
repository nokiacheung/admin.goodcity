import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['review_item/accept'],

  formData: function() {
    return {
      donorConditionId: this.get("model.donorConditionId"),
      donorDescription: this.get("model.donorDescription")
    };
  }.property("model"),

  defaultPackage: Ember.computed.alias('model.packageType'),
  item: Ember.computed.alias('model'),
  displayEditLink: Ember.computed.alias('controllers.review_item/accept.displayEditLink'),

  isEditing: function(key, value){
    if(arguments.length > 1) {
      return value;
    } else {
      var item = this.get('item');
      var description = Ember.$.trim(item.get('donorDescription'));
      return !(item.get('donorCondition') && description.length > 0);
    }
  }.property('item', 'item.donorDescription', 'item.donorCondition'),

  itemTypeName: function(key, value) {
    return (arguments.length > 1) ? value : this.get('defaultPackage.name');
  }.property('defaultPackage'),

  itemTypeId: function(key, value) {
    return (arguments.length > 1) ? value : this.get('defaultPackage.id');
  }.property('defaultPackage' ),

  itemId: function(){
    return this.get("model.id");
  }.property('model'),

  actions: {
    getItemId: function(id, name) {
      this.set('itemTypeId', id);
      this.set('itemTypeName', name);
      this.get('controllers.review_item/accept').send('setItemTypeDetails', id, name);
      return;
    },

    setEditing: function(value){
      this.set("isEditing", value);
    },

    copyItem: function(){
      var loadingView = this.container.lookup('view:loading').append();
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
