import MessagesBaseRoute from 'shared-goodcity/routes/messages_base';

export default MessagesBaseRoute.extend({
  renderTemplate() {
    this.render('offer/donor_messages', {controller: 'offer.supervisor_messages'});
  }
});
