import MessagesBaseRoute from 'shared-goodcity/routes/messages_base';

export default MessagesBaseRoute.extend({
  renderTemplate() {
    this.render('message_template', {controller: 'review_item.donor_messages'});
  },

  model() {
    var itemId = this.modelFor('review_item').get('id');
    return this.store.query('version', { item_id: itemId, for_item: true });
  },
});
