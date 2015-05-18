import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['selectedItemId', 'selectedItemName', 'disabled'],
  selectedItype: {id: null},
  store: Ember.inject.service(),
  disabled: false,
  enabled: Ember.computed.not('disabled'),
  placeholderText: Ember.I18n.t("review_item.add_item_label"),

  selectedItypeObserver: function(){
    return this.set('selectedItemName', this.get('findSelectedItem.name'));
  }.observes('selectedItemId'),

  change: function(value) {
    this.set('selectedItemId',value.val);
    this.sendAction('getItemId', this.get('selectedItemId'), this.get('selectedItemName'));
  },

  itemTypes: function() {
    return this.get("store").all('package_type').sortBy('name');
  }.property(),

  findSelectedItem: function(){
    return this.get("store").getById('package_type', this.get('selectedItemId'));
  }.property('selectedItemId')
});
