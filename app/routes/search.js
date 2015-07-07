import AuthorizeRoute from './authorize';
import Ember from 'ember';

export default AuthorizeRoute.extend({
  lastVisitedRoute: Ember.computed.localStorage(),

  beforeModel: function() {
    var previousRoutes = this.router.router.currentHandlerInfos;
    var previousRoute = previousRoutes && previousRoutes.pop();
    if(previousRoute) {
      this.set("lastVisitedRoute", previousRoute.name);
    }
  }
});
