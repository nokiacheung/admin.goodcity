import Ember from 'ember';
import sendMsg from './../send_message';

export default sendMsg.extend({

  actions: {
    sendMessage: function() {
      this._super(true, true);
    },

    showMessage: function(message) {
      var scrollTo = function() {
        window.setTimeout(function() { Ember.$('body').scrollTop(Ember.$("#"+message.get('id')).offset().top); }, 0);
      };
      this.transitionToRoute('review_offer.supervisor_messages').then(scrollTo);
    },
  }

});
