import AuthorizeRoute from './authorize';
import Ember from 'ember';

export default AuthorizeRoute.extend({
  lastVisitedRoute: Ember.computed.localStorage(),

  beforeModel: function() {
    var previousRoutes = this.router.router.currentHandlerInfos;
    var previousRoute = previousRoutes && previousRoutes.pop();
    if(previousRoute && previousRoute.name !== "search") {
      this.set("lastVisitedRoute", previousRoute.name);
    }
  },

  setupController:function(controller, model) {
    this._super(controller, model);
    controller.set('lastVisitedRoute', this.get('lastVisitedRoute'));
  }
});
