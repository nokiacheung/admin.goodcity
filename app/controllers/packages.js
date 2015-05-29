import Ember from 'ember';
import PackageComponentMixin from '../mixins/package-component';

export default Ember.ArrayController.extend(PackageComponentMixin, {
  needs: ["review_item/accept", "review_item"],

  isItemTypeChanged: Ember.computed.alias('controllers.review_item/accept.isItemTypeChanged'),
  itemId: Ember.computed.alias('controllers.review_item/accept.itemId'),
  itemTypeId: Ember.computed.alias('controllers.review_item/accept.itemTypeId'),
  itemTypeName: Ember.computed.alias('controllers.review_item/accept.itemTypeName'),
  returnurl: Ember.computed.alias('controllers.review_item/accept.returnurl'),
  isItemAccepted: Ember.computed.equal("item.state", "accepted"),
  isAccepting: true,

  subItemTypes: function(){
    return this.get('controllers.review_item/accept.subItemTypes');
  }.property('controllers.review_item/accept.subItemTypes', 'itemId'),

  allSubPackagesList: function(){
    return this.get('controllers.review_item/accept.allSubPackagesList');
  }.property('controllers.review_item/accept.allSubPackagesList', 'itemId'),

  packagetypeid: function(){
    return this.get("itemTypeId");
  }.property('itemId'),

  allPackages: Ember.computed.alias("item.packages"),

  item: function() {
    return this.store.getById("item", this.get("itemId"));
  }.property("itemId"),

  actions: {
    removePackageType: function(packageobj) {
      var _this = this;
      var existsPackageType = _this.store.all("package").filterBy("id", packageobj.pkgid);
        if(Ember.isEmpty(existsPackageType)) {
         return;
        }
        else {
         existsPackageType.get("firstObject").destroyRecord();
         return;
        }
    },

    renderComponents: function(){
      this.send("removeChildViews");
      return;
    },

    removeChildViews: function() {
      var getContainer = Ember.View.views['package_container_view'];
      if (getContainer) {
        getContainer.removeAllChildren();
        this.send("renderViews");
      }
      return ;
    },

    addNewPackage: function(packageDetails){
      var _this = this;
      var packagePromises = [], packageNew;
      var item = this.store.getById('item', this.get('itemId'));
      item.set('packageType', this.store.getById('package_type', this.get('itemTypeId')));
      item.set('state_event', null);

      var clickedButton = Ember.$("input#isAccepting").val();
      var state_value = clickedButton === "true" ? "accept" :
        (item.get("isDrafted") ? 'submit' : null);

      item.save().then(() => {

        packageDetails.forEach(function(packDetail){
          packDetail.item = _this.store.getById('item', packDetail.itemId);
          packDetail.packageType = _this.store.getById('package_type', packDetail.packagetypeid);

          if(packDetail.id) {
            packageNew = _this.store.push('package', packDetail);
          } else {
            packageNew = _this.store.createRecord("package", packDetail);
          }
          packagePromises.pushObject(packageNew.save());
        });

        Ember.RSVP.all(packagePromises).then(function() {
          var acceptItem = {id: _this.get("itemId") , state_event: state_value,
            itemType: _this.store.getById('package_type', _this.get("itemTypeId"))};

          var data = _this.get("controllers.review_item.formData");
          var itemData = {
            donorDescription: data.donorDescription,
            donorCondition: _this.get("store").getById('donorCondition', data.donorConditionId)
          };
          Ember.$.extend(acceptItem, itemData);

          var item = _this.store.push('item', acceptItem);
          item.save().then(function() {
            if (_this.get("returnurl")) {
              _this.transitionToRoute(_this.get("returnurl"));
            } else {
              _this.transitionToRoute('review_offer.items');
            }
          });
        });

      }).catch(error => {
        item.rollback();
        throw error;
      });
    },

    acceptOffer: function(){
      var ths = this;
      var packagePromises = [];
      var packages = ths.get("allPackages").toArray();
      var packageDetails = this.get('packageDetails');

      if(ths.get("isItemTypeChanged") && packages.length > 0) {

        ths.store.filter('package', function(pkg){
          return pkg.get('item.id') === ths.get('itemId');
        }).then(function(pkgs) {
          pkgs.forEach(function(pkg) {
            pkg.deleteRecord();
            packagePromises.pushObject(pkg);
          });
          return Ember.RSVP.all(pkgs.invoke('save'));
        }).then(function() {
          ths.send("addNewPackage", packageDetails);
        });

      }
      else{
        ths.send("addNewPackage", packageDetails);
      }
      return;
    },
  }
});
