import Ember from 'ember';

export default Ember.Controller.extend({

  needs: ["review_item", "offer", "packages"],

  itemId: Ember.computed.alias('model'),
  itemTypeId: Ember.computed.alias('controllers.review_item.itemTypeId'),
  itemTypeName: Ember.computed.alias('controllers.review_item.itemTypeName'),
  queryParams: ["returnurl"],
  returnurl: null,

  subItemTypes: function(){
    var parentId = parseInt(this.get('itemTypeId'));
    var dataInItemType, _this = this;
    var acceptSubItemTypes = [];
    var store = this.get('store');
    dataInItemType = store.all('item_type').filterBy('parentId', parentId);
    if(Ember.isEmpty(dataInItemType)) {
      dataInItemType = store.all('item_type').filterBy('id', this.get('itemTypeId'));
    }
    dataInItemType.forEach(function(subtype) {
      var subItemTypeProperties = {};
      subItemTypeProperties.id= parseInt(subtype.get("id"));
      subItemTypeProperties.itemId = _this.get('controllers.review_item.id');
      subItemTypeProperties.itemTypeId = parseInt(subtype.get("id"));
      subItemTypeProperties.name = subtype.get("name");
      subItemTypeProperties.isItemTypeNode = subtype.get("isItemTypeNode");
      subItemTypeProperties.parentId = subtype.get("parentId");
      acceptSubItemTypes.pushObject(subItemTypeProperties);
    });
    return acceptSubItemTypes;
  }.property("itemTypeName", "itemTypeId"),

  isItemTypeChanged: function(key, value){
    return (arguments.length > 1) ? value :  false;
  }.property('itemTypeId'),

  reviewItemDidChange: function() {
    this.set('itemTypeId', '');
    this.set('itemTypeName', '');
    this.set('itemId', '');
  }.observes('controllers.review_item.each'),

  actions: {
    setItemTypeDetails: function(itemtypeid, itemtypename){
      this.set("itemTypeId", itemtypeid);
      this.set("itemTypeName", itemtypename);
      this.set("isItemTypeChanged", true);
      this.get('controllers.packages').send('renderComponents');
    }
  }
});
