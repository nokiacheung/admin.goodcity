import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['selectedItemId', 'selectedItemName'],
  selectedItype: {id: null},

  selectedItypeObserver: function(){
    return this.set('selectedItemName', this.get('findSelectedItem.name'));
  }.observes('selectedItemId'),

  change: function(value) {
    this.set('selectedItemId',value.val);
    this.sendAction('getItemId', this.get('selectedItemId'), this.get('selectedItemName'));
    return;
  },

  itemTypes: function() {
    var store = this.get('targetObject.store');
    return store.all('item_type').filterBy('parentId', null);
  }.property(),

  findSelectedItem: function(){
    var store = this.get('targetObject.store');
    return store.getById('item_type', this.get('selectedItemId'));
  }.property('selectedItemId'),
});
