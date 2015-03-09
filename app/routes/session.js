import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    if (this.session.get('isLoggedIn')) {
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
