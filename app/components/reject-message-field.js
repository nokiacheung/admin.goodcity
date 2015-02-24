import Ember from 'ember';

export default Ember.Component.extend({

  placeholderText: function(){
    return Ember.I18n.t("reject.message_placeholder");
  }.property(),

  rejectMessage: function(key, value){
    if(arguments.length > 1) {
      return value;
    } else {
      var store = this.get('targetObject.store');
      var reasonRecord = store.getById('rejection_reason', this.get('selectedId'));
      var reason = reasonRecord && reasonRecord.get('name');
      var message = "";

      switch(reason) {
        case Ember.I18n.t("reject.quality"):
          message = Ember.I18n.t("reject.reject_message") + Ember.I18n.t("reject.quality_message");
          break;
        case Ember.I18n.t("reject.size") :
          message = Ember.I18n.t("reject.reject_message") + Ember.I18n.t("reject.size_message");
          break;
        case Ember.I18n.t("reject.supply") :
          message = Ember.I18n.t("reject.supply_message");
          break;
      }

      if(this.get('selectedId') === "-1") {
        message = Ember.I18n.t("reject.reject_message");
      }
      return message;
    }
  }.property('selectedId'),

  actions: {
    clearRejectMessage: function(){
      this.set('rejectMessage', '');
    },
  },

  didInsertElement: function(){
    var store = this.get('targetObject.store');
    var item = store.getById('item', this.get('itemId'));
    this.set('rejectMessage', item.get('rejectionComments'));
  }
});
