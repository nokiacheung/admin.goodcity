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
      if (this.get('session.currentUser.isStaff')) {
        if(this.isEvery('offer.state', 'submitted')) {
          this.transitionToRoute("inbox");
        } else {
          this.transitionToRoute("inbox.under_review");
        }
        return;
      }

      var uniqueOfferIds = this.mapBy('offer.id').uniq();

      if (uniqueOfferIds.length > 1) {
        this.transitionToRoute("offers.index");
      }
      else{
        var offer = this.store.getById('offer', uniqueOfferIds.get('firstObject'));
        this.transitionToRoute("offer.messages", offer);
      }
    }
  }
});
