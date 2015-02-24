import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  staffRestricted: true,

  model: function() {
    return this.transitionTo('review_offer.items');
  }

});
