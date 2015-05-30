import Ember from 'ember';

export default Ember.Controller.extend({

  needs: ["review_item", "offer", "packages"],

  itemId: Ember.computed.alias('model'),
  itemTypeId: Ember.computed.alias('controllers.review_item.itemTypeId'),
  itemTypeName: Ember.computed.alias('controllers.review_item.itemTypeName'),
  queryParams: ["returnurl"],
  returnurl: null,
  displayEditLink: false,

  selectedPackage: function(){
    var parentId = parseInt(this.get('itemTypeId'));
    return this.get('store').getById('package_type', parentId);
  }.property("itemtypeid", "itemTypeName"),

  allSubPackagesList: function(){
    var parentId = parseInt(this.get('itemTypeId'));
    var dataInItemType, _this = this;
    var acceptSubItemTypes = [];
    if(parentId){
      var parent = this.get('selectedPackage');
      dataInItemType = parent.allChildPackagesList();
      dataInItemType.forEach(function(subtype) {
        var subItemTypeProperties = {};
        subItemTypeProperties.id = parseInt(subtype.get("id"));
        subItemTypeProperties.itemId = _this.get('controllers.review_item.id');
        subItemTypeProperties.itemTypeId = parseInt(subtype.get("id"));
        subItemTypeProperties.name = subtype.get("name");
        subItemTypeProperties.isItemTypeNode = subtype.get("isItemTypeNode");
        acceptSubItemTypes.pushObject(subItemTypeProperties);
      });
    }
    return acceptSubItemTypes;
  }.property("selectedPackage"),

  subItemTypes: function(){
    var parentId = parseInt(this.get('itemTypeId'));
    var dataInItemType, _this = this;
    var acceptSubItemTypes = [];
    if(parentId){
      var parent = this.get('selectedPackage');
      dataInItemType = parent.defaultChildPackagesList();
      dataInItemType.forEach(function(subtype) {
        var subItemTypeProperties = {};
        subItemTypeProperties.id = parseInt(subtype.get("id"));
        subItemTypeProperties.itemId = _this.get('controllers.review_item.id');
        subItemTypeProperties.itemTypeId = parseInt(subtype.get("id"));
        subItemTypeProperties.name = subtype.get("name");
        subItemTypeProperties.isItemTypeNode = subtype.get("isItemTypeNode");
        acceptSubItemTypes.pushObject(subItemTypeProperties);
      });
    }
    return acceptSubItemTypes;
  }.property("selectedPackage"),

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
    },

    setDisplayEditLink: function(value) {
      this.set('displayEditLink', value);
    },

    setEditing: function(){
      this.get('controllers.review_item').send('setEditing', false);
    }
  }
});
