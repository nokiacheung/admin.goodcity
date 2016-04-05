import Ember from 'ember';
import backNavigator from './../mixins/back_navigator';

export default Ember.Controller.extend(backNavigator, {

  allMessages: Ember.computed(function(){
    return this.store.peekAll("message");
  }),

  model: Ember.computed("allMessages.@each.state", "session.currentUser.id", "allMessages.@each.offer.createdBy", function(){
    var currentUserId = this.get('session.currentUser.id');

    return this.get("allMessages").filterBy("state", "unread").rejectBy("offer.createdBy.id", currentUserId);
  }),

  actions: {
    displayNotification() {
      this.send("togglePath", "my_notifications");
    }
  }

});
