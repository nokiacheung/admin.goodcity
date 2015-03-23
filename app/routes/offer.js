import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({
  model: function(params) {
    var offer = this.store.getById('offer', params.offer_id);
    return (offer ? offer : this.send("error"));
  }
});
