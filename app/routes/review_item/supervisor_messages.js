import MessagesBaseRoute from 'shared-goodcity/routes/messages_base';

export default MessagesBaseRoute.extend({
  renderTemplate() {
    this.render('message_template', {controller: 'review_item.supervisor_messages'});
  }
});
