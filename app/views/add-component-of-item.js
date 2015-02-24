import Ember from 'ember';
import PackageComponentMixin from '../mixins/package-component';

  var addComponentOfItem = Ember.View.extend(PackageComponentMixin, {
    templateName: 'packages/add_component_link',
  });
export default addComponentOfItem;
