import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['createdAt'],
  sortAscending: false,

  model: function(){
     return this.store.filter('message', function(message) {
        return message.get('state') === 'read';
    });
  }.property(),
});
