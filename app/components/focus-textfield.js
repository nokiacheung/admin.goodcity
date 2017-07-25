import Ember from "ember";

export default Ember.TextField.extend({
  tagName: "input",
  type:    "text",
  attributeBindings: [ "name", "id", "value", 'placeholder'],
  cordova: Ember.inject.service(),

  iosItemTypeSearchPage: Ember.computed(function() {
    return this.get("cordova").isIOS() && Ember.$(".fixed_item_type_search").length > 0;
  }),

  scrollToStart() {
    Ember.$(".fixed_item_type_search").css({"position": "absolute"});
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },

  focusOut(){
    if(this.get("iosItemTypeSearchPage")) {
      Ember.$(".fixed_item_type_search").css({"position": "fixed"});
    }
  },

  didInsertElement() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.$().focus();
    if(this.get("iosItemTypeSearchPage")) {
      this.element.addEventListener('touchstart', this.scrollToStart);
    }
  },

  willDestroyElement() {
    if(this.get("iosItemTypeSearchPage")) {
      this.element.addEventListener('touchstart', this.scrollToStart);
    }
  }

});
