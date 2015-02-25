import Ember from 'ember';
import SendMessage from 'ember-goodcity/controllers/send_message';

var sendMessage = SendMessage.extend({

  needs: ["offer", "review_item"],

  actions: {
    sendMessage: function(is_private, for_item) {

      var offer_id = this.get('controllers.offer').get('id');
      var offer = this.store.getById('offer', offer_id);

      var newMessageProperties = this.getProperties('body');
      newMessageProperties.offer = offer;
      newMessageProperties.myMessage = true;
      newMessageProperties.isPrivate = is_private;
      newMessageProperties.createdAt = new Date();
      newMessageProperties.sender = this.store.getById('user', this.session.get("currentUser.id"));

      if(for_item) {
        var item_id = this.get('controllers.review_item.id') || this.get('controllers.item.model.id');
        var item = this.store.getById('item', item_id);
        newMessageProperties.item = item;
      }

      var message = this.store.createRecord('message', newMessageProperties);
      message.save();

      this.set('body', '');
      Ember.$("body").animate({ scrollTop: Ember.$(document).height() }, 1000);
    }
  }

});

export default sendMessage;
