import ReadMessagesRoute from './../read_messages';

export default ReadMessagesRoute.extend({
  model: function() {
    var itemId = this.modelFor('item').get('id');
    return this.store.filter('message', function(message) {
      return message.get('item.id') === itemId && message.get('isPrivate') === false;
    });
  }
});
