import Ember from 'ember';

export default Ember.ArrayController.extend({

  needs: ['application'],

  sortProperties: ['id'],
  sortAscending: false,

  model: function() {
    return this.store.filter('message', function(message) {
      return message.get('state') === 'unread';
    });
  }.property('message.@each.state'),

  unreadFirst: function() {
    return this.get('model.lastObject') || null;
  }.property('model.[]'),

  actions: {
    viewUnread: function() {
      if(this.isEvery('offer.state', 'submitted')) {
        this.transitionToRoute("inbox");
      } else {
        this.transitionToRoute("inbox.under_review");
      }
    }
  }
});
