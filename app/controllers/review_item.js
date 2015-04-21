import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['review_item/accept'],

  defaultPackage: Ember.computed.alias('model.itemType'),
  item: Ember.computed.alias('model'),

  itemTypeName: function(key, value) {
    return (arguments.length > 1) ? value :  this.get('defaultPackage.name');
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
    }
  }
});
