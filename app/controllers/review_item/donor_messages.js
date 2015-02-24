import Ember from 'ember';
import sendMessage from './../send_message';

export default sendMessage.extend({

  actions: {
    sendMessage: function() {
      this._super(false, true);
    },

    showMessage: function(message) {
      var scrollTo = function() {
        window.setTimeout(function() { Ember.$('body').scrollTop(Ember.$("#"+message.get('id')).offset().top); }, 0);
      };
      this.transitionToRoute('review_offer.messages').then(scrollTo);
    }
  }

});
