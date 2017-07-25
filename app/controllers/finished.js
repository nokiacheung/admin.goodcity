import Ember from 'ember';

export default Ember.Controller.extend({

  i18n: Ember.inject.service(),
  pageTitle: Ember.computed(function() {
    return this.get("i18n").t("inbox.closed_offers");
  })

});

