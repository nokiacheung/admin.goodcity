import Ember from 'ember';
import sendMessage from './../send_message';

export default sendMessage.extend({

  needs: ['item/index', 'item'],

  noMessage: Ember.computed.equal("model.length", 0),
  messageItem: Ember.computed.alias("model.firstObject.item"),

  item: function() {
    var itemId = this.get('controllers.item.model.id');
    return this.store.getById('item', itemId);
  }.property('controllers.item.id', 'messageItem'),

  actions: {
    sendMessage: function() {
      this._super(false, true);
    },

    removeItem: function(item) {
      this.get('controllers.item/index').send('removeItem', item);
    }
  }
});
