import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({

  beforeModel: function() {
    var previousRoutes = this.router.router.currentHandlerInfos;
    var previousRoute = previousRoutes && previousRoutes.pop();
    if(previousRoute) {
      localStorage["lastVisitedRoute"] = previousRoute.name;
    }
  }
});
