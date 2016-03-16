import Ember from 'ember';
const { getOwner } = Ember;

export default Ember.Route.extend({

  beforeModel() {
    if (this.session.get('isLoggedIn')) {
      var currentUser = this.get('session.currentUser');

      if(currentUser) {
        var myOffers = this.store.peekAll('offer').filterBy('reviewedBy.id', currentUser.get('id'));
        if(myOffers.get('length') > 0) {
          this.transitionTo('my_list');
        } else {
          this.transitionTo('offers.submitted');
        }
      } else {
        getOwner(this).lookup("route:application")._loadDataStore();
      }

    }
  }
});
