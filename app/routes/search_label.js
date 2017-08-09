import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({

  afterModel(model, transition){
    var pkgs = model.get("packages");
    if(pkgs && pkgs.length > 0 && (pkgs.get("firstObject.hasAllPackagesDesignated") || pkgs.get("firstObject.hasAllPackagesDispatched"))){
      transition.abort();
      this.get('messageBox').alert(this.get("i18n").t('designated_dispatched_error'));
    }
  },

  model(params) {
    return this.store.peekRecord("item", params["item_id"]);
  }
});
