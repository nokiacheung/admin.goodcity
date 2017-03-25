import Ember from "ember";
import ValidatableInput from 'ember-cli-html5-validation/mixins/validatable-input';

export default Ember.Component.extend(ValidatableInput, {
  content: null,
  selectedValue: null,
  pkg: null,
  index: null,
  flag: true,
  didRender() {
    this._super(...arguments);
    if ( this.pkg != null && this.pkg.packageType != null && this.flag === true){
      if(this.pkg.notes.length === 0 || Ember.$("#"+this.index).val()){
        this.pkg.notes = this.pkg.packageType.get('name');
      }
      Ember.$("#"+this.index).val(this.pkg.notes);
      this.flag=false;
    //   Ember.$("#"+this.index).val(this.pkg.packageType.get('name'));
    }
    // else{

    // }

  },

  didUpdate() {
    this._super(...arguments);
    if ( this.pkg != null && this.pkg.packageType != null && this.pkg.notes.length === 0 && this.flag === false){
      this.flag=true;
      // this.pkg.notes = this.pkg.packageType.get('name');
       Ember.$("#"+this.index).val(this.pkg.notes);
    //   Ember.$("#"+this.index).val(this.pkg.packageType.get('name'));
    }
    // else{

    // }

  },

  // overriden from ember-cli-html5-validation addon
  inputTagName: function() {
    return "select";
  }.property(),

  // overriden from ember-cli-html5-validation addon
  validate: function() {
    var input = Ember.$(this.element).find("select")[0],
      jQueryElement = Ember.$(input);

    if (input.hasAttribute('formnovalidate')) { return; }

    if(input.hasAttribute('required')) {
      var content = Ember.$.trim(jQueryElement.val());

      if(content.length === 0) {
        jQueryElement.val('');
      }
    }

    if (!input.validity.valid) {
      this.set('errorMessage', "");
    } else {
      this.set('errorMessage', null);
    }

    input.setCustomValidity('');

    if (!this.get('wasValidated')) {
      jQueryElement.off('focusout').on('keyup', Ember.run.bind(this, this.validate));
      this.set('wasValidated', true);
    }
  },

  actions: {
    change() {
      const changeAction  = this.get('on-change');
      const selectedIndex = this.$('select').prop('selectedIndex');
      var content         = this.get('content').toArray();
      if (this.get("prompt")) { content = [{name:null}].concat(content); }
      const selectedValue = content[selectedIndex];
      var availablePkg = this.get("pkg");
      Ember.$("#"+this.get('index')).val(this.pkg.notes);
      this.set('selectedValue', selectedValue);
      changeAction(selectedValue);
    }
  }
});
