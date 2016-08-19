import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";
import backNavigator from './../mixins/back_navigator';
const { getOwner } = Ember;

export default Ember.Controller.extend(backNavigator, {
  filter: '',
  searchText: '',
  fetchMoreResult: true,
  searchPlaceholder: t("search.placeholder"),
  i18n: Ember.inject.service(),

  allUsers: Ember.computed(function(){
    return this.store.peekAll("user");
  }),

  allItems: Ember.computed(function(){
    return this.store.peekAll("item");
  }),

  allGogovanOrders: Ember.computed(function(){
    return this.store.peekAll("gogovan_order");
  }),

  allPackageTypes: Ember.computed(function(){
    return this.store.peekAll("package_type");
  }),

  allAddresses: Ember.computed(function(){
    return this.store.peekAll("address");
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

  filteredResults: Ember.computed('filter', 'fetchMoreResult', 'allUsers.[]', 'allItems.@each.donorDescription', 'allGogovanOrders.@each.driverLicense', 'allPackageTypes.@each.name', 'allAddresses.@each.regionDetails', function(){
    var filter = Ember.$.trim(this.get('filter').toLowerCase().replace(/\s\s+/g, ' '));
    var offers = [];
    var store = this.store;
    var matchFilter = function(value) {
      value = value.replace(/\n/g, " ").replace(/\s\s+/g, ' ');
      return (value || "").toLowerCase().indexOf(filter) !== -1;
    };

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
            var offer = store.peekRecord('offer', pkg.get('offerId'));
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
      this.send("togglePath", "search");
    },

    searchOnServer() {
      var controller = this;
      var loadingView = getOwner(controller).lookup('component:loading').append();
      return this.store.query('offer', { states: ["not_active"] }).finally(function(){
        controller.set('fetchMoreResult', false);
        loadingView.destroy();
      });
    }
  },

});
