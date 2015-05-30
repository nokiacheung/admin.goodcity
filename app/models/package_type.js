import DS from 'ember-data';
import Ember from 'ember';

var attr = DS.attr,
  hasMany = DS.hasMany;

export default DS.Model.extend({
  name:                 attr('string'),
  code:                 attr('string'),
  isItemTypeNode:       attr('boolean', {defaultValue: false}),
  defaultChildPackages: attr('string'),
  otherChildPackages:   attr('string'),

  packages:       hasMany('package', { inverse: 'packageType' }),
  packagesCount:  Ember.computed.alias("packages.length"),

  defaultChildPackagesList: function() {
    return this._getPackages(this, this.get("defaultChildPackages"));
  },

  otherChildPackagesList: function() {
    return this._getPackages(this, this.get("otherChildPackages"));
  },

  allChildPackagesList: function() {
    return this.defaultChildPackagesList().concat(this.otherChildPackagesList());
  },

  _getPackages: function(model, packageNames){
    var array = (packageNames || "").split(',');
    var packages = [];
    array.forEach(function(type) {
      model.store.filter("packageType", function (pkg) {
        return pkg.get("code") === type ? packages.push(pkg) : "";
      });
    });
    return packages;
  }
});
