import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({

  model() {
    return this.transitionTo('review_offer.items');
  }

});
