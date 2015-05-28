import Ember from 'ember';
import PackageComponentMixin from '../mixins/package-component';

export default Ember.View.extend(PackageComponentMixin, {
  templateName: 'packages/add_component_link',

  didInsertElement: function() {
    Ember.$().ready(function(){
      Ember.$('.accept_buttons .save_item').click(function(){
        Ember.$("input#isAccepting").val("false");
      });

      Ember.$('.accept_buttons .accept_item').click(function(){
        Ember.$("input#isAccepting").val("true");
      });
    });
  }
});
