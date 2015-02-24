import Ember from 'ember';

var addPackageComponent = Ember.View.extend({
    templateName: "packages/add_item_type_component",

  actions: {
    removeItemTypeComponent: function() {
      var containerView = Ember.View.views["package_container_view"];
      var packageObj = this;
      containerView.get("controller").send("removePackageType", packageObj);
      containerView.removeChild(this);
    }
  }
});

export default addPackageComponent;
