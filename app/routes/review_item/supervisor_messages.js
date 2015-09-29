import ReadMessagesRoute from './../read_messages';

export default ReadMessagesRoute.extend({

  renderTemplate() {
    this.render('message_template', {controller: 'review_item.supervisor_messages'});
  },

  model() {
    var itemId = this.modelFor('reviewItem').get('id');
    return this.store.filter('message', function(message) {
      return message.get('item.id') === itemId && message.get('isPrivate') === true;
    });
  }
});
