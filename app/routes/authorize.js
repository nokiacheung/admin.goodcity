import Ember from 'ember';

var AuthorizeRoute =  Ember.Route.extend({
  staffRestricted: false,

  beforeModel: function(transition) {
    if (!this.controllerFor('application').get('isLoggedIn')) {
      alert('You must log in!');
      var loginController = this.controllerFor('login');
      loginController.set('attemptedTransition', transition);
      this.transitionTo('login');
    }

    if (this.get('staffRestricted') && !this.get('session.currentUser.isStaff')) {
      this.transitionTo('offers');
    }
  },
});

export default AuthorizeRoute;
