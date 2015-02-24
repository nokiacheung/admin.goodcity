import Ember from 'ember';

var SessionRoute = Ember.Route.extend({
  beforeModel: function() {
    if (this.controllerFor('application').get('isLoggedIn')) {
      var currentUser = this.get('session.currentUser');
      if (currentUser.get('isStaff')) {
        var myOffers = this.store.all('offer').filterBy('reviewedBy.id', currentUser.get('id'));
        if(myOffers.get('length') > 0) {
          this.transitionTo('inbox.my_list');
        } else {
          this.transitionTo('inbox');
        }
      } else {
        this.transitionTo('/offers');
      }
    }
  }
});

export default SessionRoute;
