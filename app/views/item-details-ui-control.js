import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";

export default Ember.View.extend({
  templateName: 'item-details-ui-control',
  tagName: 'div',
  attributeBindings: ["value", "itemid", "itemtypeid", "itemtypename", "name",
    "itemval", "width", "height", "length", "quantity", "comment",
    "subItemtypes", "packagetypeid", "packagetype", "pkgid", "allSubPackagesList"],

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

  promptText: t("placeholder.package_type"),
  commentPlaceholder: t("placeholder.comments"),
  qtyPlaceholder: t("placeholder.qty"),
  lengthPlaceholder: t("placeholder.length"),
  widthPlaceholder: t("placeholder.width"),
  heightPlaceholder: t("placeholder.height"),

  store: Ember.inject.service(),
  i18n: Ember.inject.service(),

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
