import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  model: function() {
    return this.transitionTo('scheduled.collection');
  }
});
