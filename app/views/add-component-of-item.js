import Ember from 'ember';
import PackageComponentMixin from '../mixins/package-component';

export default Ember.View.extend(PackageComponentMixin, {
  templateName: 'packages/add_component_link',
});
