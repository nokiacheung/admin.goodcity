import DS from 'ember-data';
import Ember from 'ember';

var attr = DS.attr,
  hasMany = DS.hasMany;

export default DS.Model.extend({
  name:           attr('string'),
  code:           attr('string'),
  parentId:       attr('number'),
  isItemTypeNode: attr('boolean', {defaultValue: false}),
  text:           "",
  packages:       hasMany('package', { inverse: 'packageType' }),
  packagesCount:  Ember.computed.alias("packages.length"),
});
