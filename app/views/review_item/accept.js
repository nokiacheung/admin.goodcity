import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function() {
    this.get('controller').send('setDisplayEditLink', true);
  },

  willDestroyElement: function() {
    this.get('controller').send('setEditing', false);
    this.get('controller').send('setDisplayEditLink', false);
  }
});
