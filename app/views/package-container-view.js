import Ember from 'ember';

export default Ember.ContainerView.extend({
  classNames: ["row"],

  onInit: function() {
    if (this.get('noPackages') && this.get('noSubItemType')) {
      var viewProps = {id:0, templateName: "packages/static_item_type_component"};
      this.pushObject(this.createChildView(viewProps));
    }
  }.on("init")
});
