import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({
  fromMyListPage: null,

  beforeModel: function() {
    var previousRoutes = this.router.router.currentHandlerInfos;
    var previousRoute = previousRoutes && previousRoutes.pop();

    if(previousRoute){
      var isSearchRoute = previousRoute.name === "search";
      var isFromMyListPage = previousRoute.name.indexOf("my_list") > -1;

      if(!isSearchRoute) {
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

