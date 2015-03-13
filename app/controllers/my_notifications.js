import Ember from 'ember';
import offers from './offers';
import messagesUtil from "../utils/messages";

export default offers.extend({
  sortProperties: ["createdAt:desc"],
  sortedModel: Ember.computed.sort("model", "sortProperties"),

  myNotifications: function() {
    var keys = {};
    var res = [];
    this.get("sortedModel").forEach(function(message) {
      var isPrivate = message.get("isPrivate");
      var key = isPrivate + message.get("offer.id") + (message.get("item.id") || "");
      if (!keys[key]) {
        var props = ["id", "body", "item", "offer", "sender", "createdAt", "isPrivate"];
        var notification = Ember.Object.create(message.getProperties(props));
        notification.set("unreadCount", message.get("state") === "unread" ? 1 : 0);

        keys[key] = notification;
        res.push(notification);
      } else if (message.get("state") === "unread") {
        var unreadCount = keys[key].get("unreadCount");
        keys[key].set("unreadCount", unreadCount + 1);
      }
    });
    return res;
  }.property("model.@each.state"),

  actions: {
    view: function(messageId){
      var message = this.store.getById('message', messageId);
      var route = messagesUtil.getRoute(this.container, message);
      this.transitionToRoute.apply(this, route);
    }
  }
});
