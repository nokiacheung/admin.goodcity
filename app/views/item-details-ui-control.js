import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'item-details-ui-control',
  tagName: 'div',
  attributeBindings: ["value", "itemid", "itemtypeid", "itemtypename", "name",
    "itemval", "width", "height", "length", "quantity", "comment",
    "subItemtypes", "packagetypeid", "packagetype", "pkgid"],

  value: null,
  itemtypename: null,
  itemid: null,
  width: null,
  heigth: null,
  length: null,
  quantity: null,
  isHide: false,
  subItemtypes: null,
  pkgid: null,
  packagetypeid: null,
  packagetype: null,

  promptText: Ember.I18n.t("placeholder.package_type"),
  commentPlaceholder: Ember.I18n.t("placeholder.comments"),
  qtyPlaceholder: Ember.I18n.t("placeholder.qty"),
  lengthPlaceholder: Ember.I18n.t("placeholder.length"),
  widthPlaceholder: Ember.I18n.t("placeholder.width"),
  heightPlaceholder: Ember.I18n.t("placeholder.height"),

  store: Ember.inject.service(),

  package: function() {
    return this.get("store").getById("package", this.get("pkgid"));
  }.property("pkgid"),

  item: function() {
    // using itemval.itemId instead of itemid since it's available when adding a new package
    return this.get("store").getById("item", this.get("itemval.itemId"));
  }.property("itemval.itemId"),

  imageUrl: function() {
    return this.get("package.displayImageUrl") || this.get("item.displayImageUrl");
  }.property("package.displayImageUrl", "item.displayImageUrl"),

  didInsertElement: function () {
    if (Ember.isEmpty(this.get("quantity"))) {
      this.set("quantity", 1);
    }
  },

  actions: {
    hideComment: function(){
      return this.toggleProperty('isHide');
    }
  }
});
