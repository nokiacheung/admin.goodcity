import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";

export default Ember.Controller.extend({
  filter: '',
  searchText: '',
  fetchMoreResult: true,
  searchPlaceholder: t("search.placeholder"),
  i18n: Ember.inject.service(),

  allPackageTypes: Ember.computed("fetchMoreResult", function(){
    return this.store.peekAll('package_type');
  }),

  hasSearchText: Ember.computed('searchText', function(){
    return Ember.$.trim(this.get('searchText')).length;
  }),

  hasFilter: Ember.computed('filter', function(){
    return Ember.$.trim(this.get('filter')).length;
  }),

  onSearchTextChange: Ember.observer('searchText', function () {
    // wait before applying the filter
    Ember.run.debounce(this, this.applyFilter, 500);
  }),

  applyFilter: function() {
    this.set('filter', this.get('searchText'));
    this.set('fetchMoreResult', true);
  },

  filteredResults: Ember.computed('filter', 'fetchMoreResult', 'allPackageTypes.[]', function(){
    var filter = Ember.$.trim(this.get('filter').toLowerCase());
    var types = [];
    var matchFilter = value => (value || "").toLowerCase().indexOf(filter) !== -1;

    if (filter.length > 0) {
      this.get('allPackageTypes').forEach(function(type) {
        if (matchFilter(type.get('name')) || matchFilter(type.get('otherTerms'))) {
          types.push(type);
        }
      });
    } else {
      types = types.concat(this.get('allPackageTypes').toArray());
    }

    return types.sortBy("name").uniq();
  }),

  actions: {
    clearSearch(isCancelled) {
      this.set('filter', '');
      this.set('searchText', '');
      this.set('fetchMoreResult', true);
      if(!isCancelled) { Ember.$("#searchText").focus(); }
    },

    cancelSearch() {
      Ember.$("#searchText").blur();
      this.send("clearSearch", true);
      var item = this.get("model");
      this.transitionToRoute("review_item.accept", item);
    },

    assignItemLabel(type){
      var item = this.get("model");
      item.set("packageType", type);
      this.send("clearSearch", true);
      this.transitionToRoute("review_item.accept", item);
    }
  },

});
