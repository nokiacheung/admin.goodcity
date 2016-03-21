import Ember from 'ember';
import offers from './offers';

export default offers.extend({
  sortProperties: ["createdAt:desc"],
  sortedModel: Ember.computed.sort("model", "sortProperties"),
  messagesUtil: Ember.inject.service("messages"),

  allMessages: Ember.computed(function(){
    return this.store.peekAll("message");
  }),

  model: Ember.computed("allMessages.@each.state", "session.currentUser.id", "allMessages.@each.offer.createdBy", function(){
    var currentUserId = this.get('session.currentUser.id');

    return this.get("allMessages").rejectBy("state", "never-subscribed").rejectBy("offer.createdBy.id", currentUserId);
  }),

  showUnread: Ember.computed({
    get: function() {
      return false;
    },
    set: function(key, value) {
      return value;
    }
  }),

  myNotifications: Ember.computed('showUnread', 'allNotifications', function(){
    return this.get('showUnread') ? this.get('unreadNotifications') : this.get('allNotifications');
  }),

  unreadNotifications: Ember.computed('allNotifications.[]', function(){
    return this.get('allNotifications').rejectBy('unreadCount', 0);
  }),

  allNotifications: Ember.computed("model.@each.state", function(){
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
  }),

  actions: {
    view(messageId) {
      var message = this.store.peekRecord('message', messageId);
      var route = this.get("messagesUtil").getRoute(message);
      this.transitionToRoute.apply(this, route);
    },

    markThreadRead(messageId) {
      var message = this.store.peekRecord('message', messageId);
      this.get("messagesUtil").markRead(message);
    },

    toggleShowUnread() {
      this.set('showUnread', !this.get('showUnread'));
    },

    markAllRead() {
      var allUnreadMessages = this.get('model').filterBy('state', 'unread');
      allUnreadMessages.forEach(m => this.get("messagesUtil").markRead(m));
    }
  }
});
