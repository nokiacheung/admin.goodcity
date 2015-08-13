import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement() {
    this.$('#saveItem').click(() => this.get("controller").set("isAccepting", false));
    this.$('#acceptItem').click(() => this.get("controller").set("isAccepting", true));
  }
});
