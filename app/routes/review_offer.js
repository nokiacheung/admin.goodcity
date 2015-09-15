import Ember from 'ember';
import AuthorizeRoute from './authorize';
import './../computed/local-storage';

export default AuthorizeRoute.extend({
  fromMyListPage: Ember.computed.localStorage(),

  beforeModel: function() {
    var previousRoutes = this.router.router.currentHandlerInfos;
    var previousRoute = previousRoutes && previousRoutes.pop();

    if(previousRoute){
      var parentRoute = previousRoutes[1];
      var hasParentRoute = parentRoute.name === "offers";
      var isSearchRoute = previousRoute.name === "search";
      var isFromMyListPage = previousRoute.name.indexOf("my_list") > -1;

      if(!isSearchRoute && hasParentRoute) {
        this.set("fromMyListPage", isFromMyListPage);
      }
    }
  },

  model: function() {
    var offerId = this.modelFor('offer').get('id');
    return this.store.findRecord('offer', offerId);
  },

  setupController:function(controller, model) {
    this._super(controller, model);
    if(this.get('fromMyListPage') !== null) {
      controller.set('isMyOffer', this.get('fromMyListPage'));
    }
  }
});

