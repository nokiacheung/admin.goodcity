import Ember from 'ember';

var staticPackageComponent = Ember.View.extend({
  templateName: "packages/static_item_type_component",

  comment: function() {
    var itemId = this.get('parentView.itemid');
    var item = this.get('controller.store').getById('item', itemId);
    return item.get("donorDescription");
  }.property(),
});

export default staticPackageComponent;
