import Ember from 'ember';

var PackageContainerView = Ember.ContainerView.extend({
  classNames: ["row"],
  childViews: Ember.computed.alias("staticView"),

  staticView:  function(){
    var view;
    if(this.get('noPackages') && this.get('noSubItemType')) {
      view = Ember.View.create({
        templateName: "packages/static_item_type_component",
        id: 0
      });
    }
    return view ? [view] : [];
  }.property(),
});

export default PackageContainerView;
