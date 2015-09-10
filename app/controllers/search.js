import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";
import backNavigator from './../mixins/back_navigator';

export default Ember.Controller.extend(backNavigator, {
  filter: '',
  searchText: '',
  fetchMoreResult: true,
  searchPlaceholder: t("search.placeholder"),
  i18n: Ember.inject.service(),

  allUsers: function() {
    return this.store.peekAll("user");
  }.property(),

  allItems: function() {
    return this.store.peekAll("item");
  }.property(),

  allGogovanOrders: function() {
    return this.store.peekAll("gogovan_order");
  }.property(),

  allPackageTypes: function() {
    return this.store.peekAll("package_type");
  }.property(),

  allAddresses: function() {
    return this.store.peekAll("address");
  }.property(),

  hasSearchText: function() {
    return Ember.$.trim(this.get('searchText')).length;
  }.property('searchText'),

  hasFilter: function() {
    return Ember.$.trim(this.get('filter')).length;
  }.property('filter'),

  onSearchTextChange: function() {
    // wait before applying the filter
    Ember.run.debounce(this, this.applyFilter, 500);
  }.observes('searchText'),

  applyFilter: function() {
    this.set('filter', this.get('searchText'));
    this.set('fetchMoreResult', true);
  },

  filteredResults: function() {
    var filter = Ember.$.trim(this.get('filter').toLowerCase());
    var offers = [];
    var store = this.store;
    var matchFilter = value => (value || "").toLowerCase().indexOf(filter) !== -1;

    if (filter.length > 0) {
      this.get('allUsers').forEach(function(donor) {
        if (matchFilter(donor.get('fullName')) || matchFilter(donor.get('mobile'))) {
          var donations = donor.get('donations').rejectBy("state", "draft");
          offers = offers.concat(donations.toArray());
        }
      });

      this.get('allItems').rejectBy('isDraft', true).rejectBy('donorDescription', null).forEach(function(item) {
        if (matchFilter(item.get('donorDescription'))) {
          offers.push(item.get('offer'));
        }
      });

      this.get('allGogovanOrders').rejectBy('driverLicense', null).forEach(function(order) {
        if (matchFilter(order.get('driverLicense'))) {
          offers.push(order.get('delivery.offer'));
        }
      });

      this.get('allPackageTypes').rejectBy('packagesCount', 0).forEach(function(packageType) {
        if (matchFilter(packageType.get('name'))) {
          packageType.get('packages').forEach(function(pkg) {
            var offer = store.getById('offer', pkg.get('offerId'));
            if(offer) { offers.push(offer); }
          });
        }
      });

      this.get('allAddresses').forEach(function(address) {
        if (matchFilter(address.get('regionDetails'))) {
          var offer = address.get('addressable.delivery.offer');
          if(offer) { offers.push(offer); }
        }
      });
    }

    return offers.uniq();
  }.property('filter', 'fetchMoreResult', 'allUsers.[]', 'allItems.@each.donorDescription', 'allGogovanOrders.@each.driverLicense', 'allPackageTypes.@each.name', 'allAddresses.@each.regionDetails'),

  actions: {
    clearSearch: function() {
      this.set('filter', '');
      this.set('searchText', '');
      this.set('fetchMoreResult', true);
      Ember.$("#searchText").focus();
    },

    cancelSearch: function(){
      this.send("clearSearch");
      this.send("togglePath", "search");
    },

    searchOnServer: function(){
      var controller = this;
      var loadingView = controller.container.lookup('view:loading').append();
      return this.store.query('offer', { states: ["inactive"] }).finally(function(){
        controller.set('fetchMoreResult', false);
        loadingView.destroy();
      });
    }
  },

  focusSearchInput: function() {
    Ember.run.later(function(){
      Ember.$("#searchText").focus();
    });
  }.on('init')
});
