import Ember from "ember";
import MessagesBaseController from "shared-goodcity/controllers/messages_base";

export default MessagesBaseController.extend({
  needs: ["review_item", "offer"],
  item: Ember.computed.alias("controllers.review_item.model"),
  isPrivate: true
});
