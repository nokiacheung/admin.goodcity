import Ember from "ember";
import ValidatableInput from 'ember-cli-html5-validation/mixins/validatable-input';

export default Ember.Component.extend(ValidatableInput, {
  content: null,
  selectedValue: null,
  pkg: null,
  index: null,
  allowValueSet: true,

  didRender() {
    this._super(...arguments);
    if ( this.get('pkg') != null && this.get('pkg.packageType') != null && this.get('allowValueSet') === true){
      if(this.get('pkg.notes') === null || this.get('pkg.notes.length') === 0) {
        this.set('pkg.notes', this.get('pkg.packageType.name'));
      }
      Ember.$("textarea#"+this.get('index')).val(this.get('pkg.notes'));
      this.set('allowValueSet', false);
    }
  },

  didUpdate() {
    this._super(...arguments);
    if ( this.get('allowValueSet') === false && this.get('pkg') != null && this.get('pkg.packageType') != null && (this.get('pkg.notes.length') === null || this.get('pkg.notes.length') === 0 ) ){
      this.set('allowValueSet', true);
      Ember.$("textarea#"+this.index).val(this.get('pkg.notes'));
    }
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
      if(this.index != null && selectedValue.name != null ){
        selectedValue.set('indexOfChild', this.get('index'));
        var availablePkg = this.get("pkg");
        var name = selectedValue.get('name');
        Ember.$("textarea#"+this.get('index')).val(name);
        selectedValue.set('indexOfChild', availablePkg.id);
      }
      this.set('selectedValue', selectedValue);
      changeAction(selectedValue);
    }
  }
});
