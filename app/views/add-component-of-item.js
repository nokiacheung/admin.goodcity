import Ember from 'ember';
import PackageComponentMixin from '../mixins/package-component';

export default Ember.View.extend(PackageComponentMixin, {
  templateName: 'packages/add_component_link',

  didInsertElement: function() {
    Ember.$().ready(function(){
      Ember.$('.accept_buttons .save_item').click(function(){
        Ember.$("input#isAccepting").val("false");
        return validateTextArea();
      });

      Ember.$('.accept_buttons .accept_item').click(function(){
        Ember.$("input#isAccepting").val("true");
        return validateTextArea();
      });
    });

    function validateTextArea(){
      var input = Ember.$("textarea[name='donorDescription']");
      if(input.length > 0) {
        if(!input[0].validity.valid && !input[0].validity.customError){
          var parent = Ember.$(input[0]).parent();
          parent.addClass('has-error');
          return false;
        }
      } else {
        return true;
      }
    }
  }
});
