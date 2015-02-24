import AuthorizeRoute from '../authorize';

export default AuthorizeRoute.extend({
  model: function() {
    var offer = this.store.createRecord('offer');

    var route = this;
    offer.save().then(function(){
      route.transitionTo('offer', offer.id);
    });
  }
});
