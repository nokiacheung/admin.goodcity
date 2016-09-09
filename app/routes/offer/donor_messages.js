import MessagesBaseRoute from 'shared-goodcity/routes/messages_base';

export default MessagesBaseRoute.extend({
  model() {
    var offerId = this.modelFor("offer").get("id");
    return this.store.query('version', { item_id: offerId, for_offer: true });
  }
});
