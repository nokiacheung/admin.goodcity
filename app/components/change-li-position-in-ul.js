import Ember from 'ember';

export default Ember.Component.extend({

  didInsertElement() {
    this._super(...arguments);
    //alert("added");
    Ember.$('ul.list').find('li.general_messages').insertBefore('ul li:eq(0)');
  }

});
