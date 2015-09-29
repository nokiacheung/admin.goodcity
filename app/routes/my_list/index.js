import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  model() {
    return this.transitionTo('my_list.reviewing');
  }
});
