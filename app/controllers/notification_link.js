import Ember from 'ember';
import backNavigator from './../mixins/back_navigator';

export default Ember.Controller.extend(backNavigator, {

  model: Ember.computed('message.@each.state', function(){
    var currentUserId = this.get("session.currentUser.id");

    return this.store.filter('message', function(message) {
      return message.get('state') === 'unread' && message.get('offer.createdBy.id') !== currentUserId;
    });
  }),

  actions: {
    displayNotification() {
      this.send("togglePath", "my_notifications");
    }
  }

});
