import AuthorizeRoute from './authorize';
import Ember from 'ember';

export default AuthorizeRoute.extend({
  lastVisitedRoute: Ember.computed.localStorage(),

  beforeModel: function() {
    var previousRoutes = this.router.router.currentHandlerInfos;
    var previousRoute = previousRoutes && previousRoutes.pop();

    if(previousRoute){
      var isSearchRoute = previousRoute.name === "search";
      var isTrackable   = previousRoute.handler.controller.hasOffersList;

      if(!isSearchRoute && isTrackable) {
        this.set("lastVisitedRoute", previousRoute.name);
      }
    }
  },

  setupController:function(controller, model) {
    this._super(controller, model);
    controller.set('lastVisitedRoute', this.get('lastVisitedRoute'));
  }
});
