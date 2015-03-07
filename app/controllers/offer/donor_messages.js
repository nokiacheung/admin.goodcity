import sendMsg from './../send_message';

export default sendMsg.extend({
  needs: ['offer'],

  staffMessagesPage: true,

  offer: function(){
    var offerId = this.get('controllers.offer').get('id');
    return this.store.getById('offer', offerId);
  }.property('controllers.offer.id'),

  actions: {
    sendMessage: function() {
      this._super(false);
    }
  }
});
