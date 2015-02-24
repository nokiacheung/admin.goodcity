import Ember from 'ember';

export default Ember.View.extend({
  initiatePreview: function(){
    Ember.$().ready(function(){
      Ember.$("#lightGallery").lightGallery({
        thumbnail: false,
        hideControlOnEnd: true,
        closable: false,
        counter: true,
        swipeThreshold : 50,
        enableTouch : true,
      });
    });
  }.on('didInsertElement')
});
