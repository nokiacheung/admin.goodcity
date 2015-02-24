import Ember from 'ember';
import addPackageComponent from '../views/add-package-component';
import staticPackageComponent from '../views/static-package-component';

export default Ember.Mixin.create({
  _createChildView: function(first) {
    var containerView = Ember.View.views['package_container_view'];
    var childView = first ?
      containerView.createChildView(staticPackageComponent) :
      containerView.createChildView(addPackageComponent);
    containerView.pushObject(childView);
    return childView;
  },

  _createSubItemTypeView: function(subItemType, index) {
    this._createChildView(index === 0).setProperties({
      id:             subItemType.itemTypeId,
      itemtypeid:     subItemType.itemTypeId,
      itemid:         subItemType.itemId,
      itemtypename:   subItemType.name,
      isDefaultIType: subItemType.isItemTypeNode,
      packagetypeid:  subItemType.itemTypeId,
      packagetype:    subItemType,
      subitemtypes:   subItemType,
      length:         subItemType.length,
      height:         subItemType.height,
      width:          subItemType.width,
      quantity:       subItemType.quantity
    });
  },

  _createPackageView: function(currentPackage, index) {
    this._createChildView(index === 0).setProperties({
      pkgid:         currentPackage.get('id'),
      length:        currentPackage.get('length'),
      height:        currentPackage.get('height'),
      width:         currentPackage.get('width'),
      quantity:      currentPackage.get('quantity'),
      comment:       currentPackage.get('notes'),
      itemid:        currentPackage.get('itemId'),
      itemtypeid:    currentPackage.get('packageTypeObject.id'),
      itemtypename:  currentPackage.get('packageTypeObject.name'),
      packagetypeid: currentPackage.get('packageTypeObject.id'),
      packagetype:   currentPackage.get('packageTypeObject')
    });
  },

  packageDetails: function() {
    // Here itemId is package property not the component attribute
    var  itemId = this.get("itemId");
    var containerView = Ember.View.views['package_container_view'];
    var packageDetails = [];

    containerView.get("childViews").forEach(function(childView) {
      var packageValues = childView.getProperties("length", "height",
        "width", "quantity", "packagetype", "packagetypeid");
      packageValues.id = childView.get("pkgid");
      packageValues.itemId = itemId;
      packageValues.notes = childView.get("comment");
      packageDetails.pushObject(packageValues);
    });

    return packageDetails;
  }.property().volatile(),

  actions: {
    addItemTypeComponent: function() {
      this._createChildView(false);
    },

    renderViews: function() {
      if (!this.get("noSubItemType")) {
        this.get('subItemTypes').forEach(this._createSubItemTypeView, this);
      }
    },

    createUpdateChildView: function(packageViewDetails) {
      packageViewDetails.forEach(this._createPackageView, this);
    }
  },

  renderComponent: function() {
    var packages = this.get('packages');

    if(packages.get('length') > 0) {
      packages.forEach(this._createPackageView, this);
    }
    else if (!this.get("noSubItemType")) {
      this.get('subItemTypes').forEach(this._createSubItemTypeView, this);
    }
  }.on('didInsertElement')
});
