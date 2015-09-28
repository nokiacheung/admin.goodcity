import Ember from 'ember';
import backNavigator from './../mixins/back_navigator';

export default Ember.Controller.extend(backNavigator, {

  model: Ember.computed('message.@each.state', function(){
    return this.store.filter('message', function(message) {
      return message.get('state') === 'unread';
    });
  }),

  actions: {
    displayNotification: function(){
      this.send("togglePath", "my_notifications");
    }
  }

});
