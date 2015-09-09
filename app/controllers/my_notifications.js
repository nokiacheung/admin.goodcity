import Ember from 'ember';
import offers from './offers';

export default offers.extend({
  sortProperties: ["createdAt:desc"],
  sortedModel: Ember.computed.sort("model", "sortProperties"),
  messagesUtil: Ember.inject.service("messages"),
  lastVisitedRoute: null,

  showUnread: function(key, value){
    return arguments.length > 1 ? value : false;
  }.property(),

  myNotifications: function(){
    return this.get('showUnread') ? this.get('unreadNotifications') : this.get('allNotifications');
  }.property('showUnread', 'allNotifications'),

  unreadNotifications: function(){
    return this.get('allNotifications').rejectBy('unreadCount', 0);
  }.property('allNotifications.[]'),

  allNotifications: function() {
    var keys = {};
    var res = [];
    this.get("sortedModel").forEach(function(message) {
      var isPrivate = message.get("isPrivate");
      var key = isPrivate + message.get("offer.id") + (message.get("item.id") || "");
      if (!keys[key]) {
        var props = ["id", "item", "offer", "sender", "createdAt", "isPrivate"];
        var notification = Ember.Object.create(message.getProperties(props));
        notification.set("unreadCount", message.get("state") === "unread" ? 1 : 0);
        notification.set("text", message.get("body"));
        notification.set("isSingleMessage", message.get("state") === "unread");

        keys[key] = notification;
        res.push(notification);
      } else if (message.get("state") === "unread") {
        var unreadCount = keys[key].get("unreadCount");
        keys[key].set("unreadCount", unreadCount + 1);
        keys[key].set("isSingleMessage", false);
        keys[key].set("isThread", true);
      }
    });
    return res;
  }.property("model.@each.state"),

  actions: {
    view: function(messageId){
      var message = this.store.peekRecord('message', messageId);
      var route = this.get("messagesUtil").getRoute(message);
      this.transitionToRoute.apply(this, route);
    },

    markThreadRead: function(messageId){
      var message = this.store.peekRecord('message', messageId);
      this.get("messagesUtil").markRead(message);
    },

    toggleShowUnread: function(){
      this.set('showUnread', !this.get('showUnread'));
    },

    markAllRead: function(){
      var allUnreadMessages = this.get('model').filterBy('state', 'unread');
      allUnreadMessages.forEach(m => this.get("messagesUtil").markRead(m));
    }
  }
});
