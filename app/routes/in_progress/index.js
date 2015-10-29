import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  model() {
    return this.transitionTo('in_progress.reviewing');
  }
});
