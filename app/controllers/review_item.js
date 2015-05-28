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
    }
  }
});
