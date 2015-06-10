import Ember from 'ember';

export default Ember.Controller.extend({
  filter: '',
  searchText: '',
  fetchMoreResult: true,
  searchPlaceholder: Ember.I18n.t("search.placeholder"),

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
      store.all('user').forEach(function(donor) {
        if (matchFilter(donor.get('fullName')) || matchFilter(donor.get('mobile'))) {
          var donations = donor.get('donations').rejectBy("state", "draft");
          offers = offers.concat(donations.toArray());
        }
      });

      store.all('item').rejectBy('isDraft', true).rejectBy('donorDescription', null).forEach(function(item) {
        if (matchFilter(item.get('donorDescription'))) {
          offers.push(item.get('offer'));
        }
      });

      store.all('gogovanOrder').rejectBy('driverLicense', null).forEach(function(order) {
        if (matchFilter(order.get('driverLicense'))) {
          offers.push(order.get('delivery.offer'));
        }
      });

      store.all('packageType').rejectBy('packagesCount', 0).forEach(function(packageType) {
        if (matchFilter(packageType.get('name'))) {
          packageType.get('packages').forEach(function(pkg) {
            var offer = store.getById('offer', pkg.get('offerId'));
            if(offer) { offers.push(offer); }
          });
        }
      });

      store.all('address').forEach(function(address) {
        if (matchFilter(address.get('regionDetails'))) {
          var offer = address.get('addressable.delivery.offer');
          if(offer) { offers.push(offer); }
        }
      });
    }

    return offers.uniq();
  }.property('filter', 'fetchMoreResult'),

  actions: {
    clearSearch: function() {
      this.set('filter', '');
      this.set('searchText', '');
      this.set('fetchMoreResult', true);
      Ember.$("#searchText").focus();
    },

    cancelSearch: function(){
      this.send("clearSearch");
      var route = localStorage["lastVisitedRoute"] || "my_list";
      this.transitionToRoute(route);
    },

    searchOnServer: function(){
      var controller = this;
      var loadingView = controller.container.lookup('view:loading').append();
      return this.store.find('offer', { states: ["inactive"] }).finally(function(){
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
