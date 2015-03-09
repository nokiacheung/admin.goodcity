import Ember from 'ember';
import inbox from './inbox';

export default inbox.extend({
  sortProperties: ["myNotificationsSort:desc"],
  sortedEntities: Ember.computed.sort("getEntities", "sortProperties"),

  getOffersOrItems: function(messages, type) {
    var entities = [];
    var entity;
    messages.forEach(function(message){
      entity = message.get("item") || message.get("offer");
      entity.set(type, "true");
      entities.push(entity);
    });
    return entities.toArray().uniq();
  },

  getEntities: function() {
    var entities = [];
    var privateMessages = this.filterBy("isPrivate", true);
    var publicMessages = this.filterBy("isPrivate", false);

    if(privateMessages){
      entities.pushObjects(this.getOffersOrItems(privateMessages, "private"));
    }
    if(publicMessages){
      entities.pushObjects(this.getOffersOrItems(publicMessages, "public"));
    }
    return entities;
  }.property("model.@each"),
});
